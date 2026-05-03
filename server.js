const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const Razorpay = require('razorpay');

/* ── Fast2SMS helper ──────────────────────────────────────────────────────── */
function sendFast2SMS(phone, otp) {
  return new Promise((resolve) => {
    const apiKey = process.env.FAST2SMS_API_KEY;
    if (!apiKey) { resolve({ success: false, reason: 'no_key' }); return; }
    const digits = phone.replace(/\D/g, '').slice(-10);
    const qs = new URLSearchParams({
      authorization: apiKey,
      variables_values: otp,
      route: 'otp',
      numbers: digits,
    }).toString();
    const options = {
      hostname: 'www.fast2sms.com',
      path: '/dev/bulkV2?' + qs,
      method: 'GET',
      headers: { 'cache-control': 'no-cache' },
    };
    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          console.log('Fast2SMS response:', JSON.stringify(parsed));
          resolve({ success: parsed.return === true, raw: parsed });
        } catch(e) { resolve({ success: false, raw: data }); }
      });
    });
    req.on('error', (err) => { console.error('Fast2SMS error:', err.message); resolve({ success: false, reason: err.message }); });
    req.end();
  });
}

const PORT = 5000;
const HOST = '0.0.0.0';

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const mimeTypes = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.webmanifest': 'application/manifest+json',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', () => {
      try { resolve(JSON.parse(body)); }
      catch(e) { resolve({}); }
    });
    req.on('error', reject);
  });
}

function json(res, status, data) {
  res.writeHead(status, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(JSON.stringify(data));
}

const server = http.createServer(async (req, res) => {
  const url = req.url.split('?')[0];

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS'
    });
    return res.end();
  }

  /* ── POST /api/send-otp ─────────────────────────────────────────────
     Sends OTP via Fast2SMS. Silently succeeds even if SMS fails
     (OTP is always shown on screen as primary delivery).
     Body: { phone, otp, name }
  ─────────────────────────────────────────────────────────────────── */
  if (req.method === 'POST' && url === '/api/send-otp') {
    try {
      const body = await readBody(req);
      const { phone, otp } = body;
      if (!phone || !otp) return json(res, 400, { sent: false, error: 'phone and otp required' });
      const result = await sendFast2SMS(phone, otp);
      return json(res, 200, { sent: result.success, reason: result.reason || null });
    } catch (err) {
      console.error('send-otp error:', err);
      return json(res, 200, { sent: false, error: err.message });
    }
  }

  /* ── POST /api/create-order ─────────────────────────────────────────
     Creates a Razorpay order.
     Body: { amount_paise, doctor_name, session_type, patient_name }
  ─────────────────────────────────────────────────────────────────── */
  if (req.method === 'POST' && url === '/api/create-order') {
    try {
      const body = await readBody(req);
      const { amount_paise, doctor_name, session_type, patient_name } = body;
      if (!amount_paise || amount_paise < 100) {
        return json(res, 400, { error: 'Invalid amount. Minimum ₹1 (100 paise).' });
      }
      const order = await razorpay.orders.create({
        amount: Math.round(amount_paise),
        currency: 'INR',
        receipt: 'rcpt_' + Date.now(),
        notes: {
          doctor: doctor_name || '',
          type: session_type || '',
          patient: patient_name || '',
        },
      });
      return json(res, 200, {
        order_id: order.id,
        amount: order.amount,
        currency: order.currency,
        key_id: process.env.RAZORPAY_KEY_ID,
      });
    } catch (err) {
      console.error('create-order error:', err);
      return json(res, 500, { error: err.message || 'Order creation failed.' });
    }
  }

  /* ── POST /api/verify-payment ───────────────────────────────────────
     Verifies Razorpay signature after successful payment.
     Body: { razorpay_order_id, razorpay_payment_id, razorpay_signature }
  ─────────────────────────────────────────────────────────────────── */
  if (req.method === 'POST' && url === '/api/verify-payment') {
    try {
      const body = await readBody(req);
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = body;
      const expected = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + '|' + razorpay_payment_id)
        .digest('hex');
      if (expected === razorpay_signature) {
        return json(res, 200, { verified: true, payment_id: razorpay_payment_id });
      } else {
        return json(res, 400, { verified: false, error: 'Signature mismatch.' });
      }
    } catch (err) {
      console.error('verify-payment error:', err);
      return json(res, 500, { error: err.message });
    }
  }

  /* ── POST /api/route-transfer ───────────────────────────────────────
     Transfers money from platform Razorpay balance to a doctor's
     Razorpay Route linked account.
     Body: { account_id, amount_rupees, doctor_name, note }
     Returns: { transfer_id, status, amount, account_id }
  ─────────────────────────────────────────────────────────────────── */
  if (req.method === 'POST' && url === '/api/route-transfer') {
    try {
      const body = await readBody(req);
      const { account_id, amount_rupees, doctor_name, note } = body;

      if (!account_id || !account_id.startsWith('acc_')) {
        return json(res, 400, { error: 'Invalid linked account ID. Must start with acc_' });
      }
      if (!amount_rupees || isNaN(parseFloat(amount_rupees)) || parseFloat(amount_rupees) < 1) {
        return json(res, 400, { error: 'Invalid amount. Minimum ₹1.' });
      }

      const amount_paise = Math.round(parseFloat(amount_rupees) * 100);

      const transfer = await razorpay.transfers.create({
        account: account_id,
        amount: amount_paise,
        currency: 'INR',
        notes: {
          doctor: doctor_name || '',
          note: note || 'Session payout',
          platform: 'Naturopathy & Yoga Care',
          date: new Date().toISOString(),
        },
      });

      console.log(`Route transfer: ₹${amount_rupees} → ${account_id} (${doctor_name}) | transfer_id: ${transfer.id}`);

      return json(res, 200, {
        transfer_id: transfer.id,
        status: transfer.status,
        amount: transfer.amount,
        account_id: transfer.recipient,
      });
    } catch (err) {
      console.error('route-transfer error:', err);
      return json(res, 500, { error: err.error_description || err.message || 'Transfer failed.' });
    }
  }

  /* ── POST /api/verify-linked-account ───────────────────────────────
     Validates that a given account ID exists on this Razorpay Route.
     Body: { account_id }
  ─────────────────────────────────────────────────────────────────── */
  if (req.method === 'POST' && url === '/api/verify-linked-account') {
    try {
      const body = await readBody(req);
      const { account_id } = body;
      if (!account_id || !account_id.startsWith('acc_')) {
        return json(res, 400, { error: 'Invalid account ID format.' });
      }
      const account = await razorpay.accounts.fetch(account_id);
      return json(res, 200, {
        valid: true,
        name: account.legal_business_name || account.contact_name || account_id,
        email: account.email || '',
        status: account.activation_status || 'active',
      });
    } catch (err) {
      console.error('verify-linked-account error:', err);
      return json(res, 400, { valid: false, error: err.error_description || 'Account not found.' });
    }
  }

  /* ── PWA: serve .well-known/assetlinks.json ─────────────────────── */
  if (url === '/.well-known/assetlinks.json') {
    fs.readFile('./.well-known/assetlinks.json', (err, content) => {
      if (err) { res.writeHead(404); return res.end('Not Found'); }
      res.writeHead(200, { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
      res.end(content);
    });
    return;
  }

  /* ── Static file server ──────────────────────────────────────────── */
  let filePath = '.' + url;
  if (filePath === './') filePath = './index.html';

  const extname = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found', 'utf-8');
    } else {
      const headers = { 'Content-Type': contentType };
      if (filePath.endsWith('sw.js')) {
        headers['Service-Worker-Allowed'] = '/';
        headers['Cache-Control'] = 'no-cache';
      }
      if (filePath.endsWith('manifest.json')) {
        headers['Access-Control-Allow-Origin'] = '*';
      }
      res.writeHead(200, headers);
      res.end(content, 'binary');
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
