const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const PORT = 5000;
const HOST = '0.0.0.0';

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
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
};

const SYSTEM_PROMPT = `You are a friendly and knowledgeable customer care assistant for "Naturopathy & Yoga Care" — an online naturopathy and yoga consultation clinic run by Dr Srihari (BNYS, MSc. Psy, Dip. in Acu) and Dr Prathima Kumari (BNYS).

Your role is to help patients and visitors by answering questions about:
- Services: Online Consultation (₹500), 1-Month Healing Plan (₹2500 + ₹500 consultation = ₹3000 total), Monthly Wellness Plan (₹3000/month)
- Conditions treated: PCOS, Thyroid, Infertility, Diabetes, Weight Management, Joint Pain, Digestive Issues, Skin Problems, Hypertension, General Wellness
- Payment: UPI ID prathimakumari5@okhdfcbank — pay ₹500 consultation first, then ₹2500 for healing plan
- Booking: Fill the form on the website or WhatsApp +91 7013989526
- Doctors: Dr Srihari specialises in Naturopathy, Acupuncture, Diet & Wellness. Dr Prathima Kumari specialises in Yoga Therapy, Women's Wellness & Lifestyle Care
- Diet uploads: Patients can upload meal photos in the "Patients" section for doctor review
- Wellness Program: Yoga, Pranayam, Relaxation, Meditation — ₹3000/month

Always be warm, supportive and professional. Keep answers concise and helpful. If asked something you don't know, suggest contacting via WhatsApp at +91 7013989526 or email srihariu123456789@gmail.com. Never give specific medical diagnoses — always recommend booking a consultation.`;

function handleChat(req, res) {
  let body = '';
  req.on('data', chunk => { body += chunk; });
  req.on('end', () => {
    let parsed;
    try { parsed = JSON.parse(body); } catch (e) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Invalid JSON' }));
      return;
    }

    const messages = parsed.messages || [];
    const payload = JSON.stringify({
      model: 'grok-3-mini',
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        ...messages
      ],
      max_tokens: 512,
      temperature: 0.7
    });

    const options = {
      hostname: 'api.x.ai',
      path: '/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + process.env.GROK_API_KEY,
        'Content-Length': Buffer.byteLength(payload)
      }
    };

    const apiReq = https.request(options, apiRes => {
      let data = '';
      apiRes.on('data', chunk => { data += chunk; });
      apiRes.on('end', () => {
        res.writeHead(apiRes.statusCode, {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        });
        res.end(data);
      });
    });

    apiReq.on('error', err => {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    });

    apiReq.write(payload);
    apiReq.end();
  });
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    });
    res.end();
    return;
  }

  if (req.method === 'POST' && req.url === '/api/chat') {
    handleChat(req, res);
    return;
  }

  let filePath = '.' + req.url.split('?')[0];
  if (filePath === './') filePath = './index.html';

  const extname = path.extname(filePath).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('Not Found', 'utf-8');
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'binary');
    }
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}/`);
});
