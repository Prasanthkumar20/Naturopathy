// =============================================
// FILE INPUT — show selected file name
// =============================================
const fileInput = document.getElementById("paymentScreenshot");
const fileName  = document.getElementById("fileName");
const form      = document.getElementById("whatsappForm");
const popup     = document.getElementById("thankYouPopup");
const langToggle = document.getElementById("langToggle");

let teluguMode = false;

if (fileInput) {
  fileInput.addEventListener("change", function () {
    if (fileName) {
      fileName.textContent = this.files.length > 0
        ? "Selected file: " + this.files[0].name
        : "No file selected";
    }
  });
}

// =============================================
// CLOSE POPUP
// =============================================
function closePopup() {
  if (popup) popup.style.display = "none";
}

// =============================================
// WHATSAPP FORM SUBMIT
// =============================================
var submitBtn = document.getElementById("submitBtn");
if (submitBtn) {
  submitBtn.addEventListener("click", function () {

    var name          = document.getElementById("name")          ? document.getElementById("name").value.trim()          : "";
    var phone         = document.getElementById("phone")         ? document.getElementById("phone").value.trim()         : "";
    var email         = document.getElementById("email")         ? document.getElementById("email").value.trim()         : "";
    var plan          = document.getElementById("plan")          ? document.getElementById("plan").value                 : "";
    var date          = document.getElementById("date")          ? document.getElementById("date").value                 : "";
    var time          = document.getElementById("time")          ? document.getElementById("time").value                 : "";
    var paymentStatus = document.getElementById("paymentStatus") ? document.getElementById("paymentStatus").value        : "";
    var transactionId = document.getElementById("transactionId") ? document.getElementById("transactionId").value.trim() : "";
    var message       = document.getElementById("message")       ? document.getElementById("message").value.trim()       : "";
    var screenshotSelected = (fileInput && fileInput.files.length > 0) ? "Yes" : "No";

    // Validation
    if (!name)          { alert("Please enter your full name.");        return; }
    if (!phone)         { alert("Please enter your phone number.");     return; }
    if (!plan)          { alert("Please select consultation type.");    return; }
    if (!date)          { alert("Please select a preferred date.");     return; }
    if (!time)          { alert("Please select a preferred time.");     return; }
    if (!paymentStatus) { alert("Please select your payment status."); return; }

    var whatsappNumber = "917013989526";
    var text = "";

    if (!teluguMode) {
      text =
        "Hello Doctor \uD83D\uDE4F I would like to book an appointment.\n\n" +
        "Name: " + name + "\n" +
        "Phone: " + phone + "\n" +
        "Email: " + (email || "Not provided") + "\n" +
        "Consultation Type: " + plan + "\n" +
        "Preferred Date: " + date + "\n" +
        "Preferred Time: " + time + "\n" +
        "Payment Status: " + paymentStatus + "\n" +
        "Transaction ID: " + (transactionId || "Not provided") + "\n" +
        "Screenshot: " + screenshotSelected + "\n" +
        "Health Concern: " + (message || "Not mentioned") + "\n\n" +
        "Note: If screenshot selected I will send it manually.";
    } else {
      text =
        "\u0C28\u0C2E\u0C38\u0C4D\u0C15\u0C3E\u0C30\u0C02 \u0C21\u0C3E\u0C15\u0C4D\u0C1F\u0C30\u0C4D \u0C17\u0C3E\u0C30\u0C41 \uD83D\uDE4F \u0C28\u0C3E\u0C15\u0C41 \u0C05\u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C2E\u0C46\u0C02\u0C1F\u0C4D \u0C2C\u0C41\u0C15\u0C4D \u0C1A\u0C47\u0C2F\u0C3E\u0C32\u0C3F.\n\n" +
        "\u0C2A\u0C47\u0C30\u0C41: " + name + "\n" +
        "\u0C2B\u0C4B\u0C28\u0C4D: " + phone + "\n" +
        "\u0C08\u0C2E\u0C46\u0C2F\u0C3F\u0C32\u0C4D: " + (email || "\u0C07\u0C35\u0C4D\u0C35\u0C32\u0C47\u0C26\u0C41") + "\n" +
        "\u0C15\u0C28\u0C4D\u0C38\u0C32\u0C4D\u0C1F\u0C47\u0C37\u0C28\u0C4D \u0C30\u0C15\u0C02: " + plan + "\n" +
        "\u0C24\u0C47\u0C26\u0C40: " + date + "\n" +
        "\u0C38\u0C2E\u0C2F\u0C02: " + time + "\n" +
        "\u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C2A\u0C41 \u0C38\u0C4D\u0C25\u0C3F\u0C24\u0C3F: " + paymentStatus + "\n" +
        "\u0C1F\u0C4D\u0C30\u0C3E\u0C28\u0C4D\u0C38\u0C3E\u0C15\u0C4D\u0C37\u0C28\u0C4D \u0C10\u0C21\u0C3F: " + (transactionId || "\u0C07\u0C35\u0C4D\u0C35\u0C32\u0C47\u0C26\u0C41") + "\n" +
        "\u0C38\u0C4D\u0C15\u0C4D\u0C30\u0C40\u0C28\u0C4D\u200C\u0C37\u0C3E\u0C1F\u0C4D: " + screenshotSelected + "\n" +
        "\u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F \u0C38\u0C2E\u0C38\u0C4D\u0C2F: " + (message || "\u0C07\u0C35\u0C4D\u0C35\u0C32\u0C47\u0C26\u0C41");
    }

    var url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(text);

    // Set manual link
    var manualLink = document.getElementById("waManualLink");
    if (manualLink) manualLink.href = url;

    // Open WhatsApp
    var newWindow = window.open(url, "_blank");

    // Fallback if blocked
    if (!newWindow || newWindow.closed || typeof newWindow.closed === "undefined") {
      var popupText = document.getElementById("popupText");
      if (popupText) {
        popupText.innerHTML =
          "WhatsApp did not open automatically.<br><br>" +
          "<a href='" + url + "' target='_blank' " +
          "style='display:block;padding:14px;background:#25D366;color:#fff;" +
          "border-radius:12px;font-weight:700;text-decoration:none;text-align:center;'>" +
          "\uD83D\uDC46 Click here to open WhatsApp</a>";
      }
    }

    // Show popup
    if (popup) popup.style.display = "flex";

    // Reset form
    if (form) form.reset();
    if (fileName) {
      fileName.textContent = teluguMode
        ? "\u0C0F \u0C2B\u0C48\u0C32\u0C4D \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C32\u0C47\u0C26\u0C41"
        : "No file selected";
    }
  });
}

// =============================================
// LANGUAGE TOGGLE
// =============================================
if (langToggle) {
  langToggle.addEventListener("click", function () {
    teluguMode = !teluguMode;

    if (teluguMode) {
      document.documentElement.lang = "te";
      langToggle.textContent = "English";

      var el;
      el = document.getElementById("badgeText");       if(el) el.textContent = "\u0C06\u0C27\u0C3E\u0C30\u0C2A\u0C42\u0C30\u0C4D\u0C35\u0C15 \u0C38\u0C39\u0C1C \u0C35\u0C48\u0C26\u0C4D\u0C2F\u0C02";
      el = document.getElementById("heroTitle");       if(el) el.textContent = "\u0C06\u0C28\u0C4D\u200C\u0C32\u0C48\u0C28\u0C4D \u0C28\u0C47\u0C1A\u0C41\u0C30\u0C4B\u0C2A\u0C24\u0C3F & \u0C2F\u0C4B\u0C17\u0C3E \u0C15\u0C28\u0C4D\u0C38\u0C32\u0C4D\u0C1F\u0C47\u0C37\u0C28\u0C4D";
      el = document.getElementById("heroDesc");        if(el) el.textContent = "\u0C05\u0C30\u0C4D\u0C39\u0C24 \u0C15\u0C32\u0C3F\u0C17\u0C3F\u0C28 \u0C28\u0C3F\u0C2A\u0C41\u0C23\u0C41\u0C32 \u0C28\u0C41\u0C02\u0C21\u0C3F \u0C35\u0C4D\u0C2F\u0C15\u0C4D\u0C24\u0C3F\u0C17\u0C24 \u0C28\u0C47\u0C1A\u0C41\u0C30\u0C4B\u0C2A\u0C24\u0C3F, \u0C21\u0C48\u0C1F\u0C4D, \u0C2F\u0C4B\u0C17\u0C3E \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C1C\u0C40\u0C35\u0C28\u0C36\u0C48\u0C32\u0C3F \u0C2E\u0C3E\u0C30\u0C4D\u0C17\u0C26\u0C30\u0C4D\u0C36\u0C15\u0C24\u0C4D\u0C35\u0C02\u0C24\u0C4B \u0C38\u0C39\u0C1C\u0C02\u0C17\u0C3E \u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F\u0C02 \u0C2A\u0C4A\u0C02\u0C26\u0C02\u0C21\u0C3F.";
      el = document.getElementById("bookBtn");         if(el) el.textContent = "\u0C05\u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C2E\u0C46\u0C02\u0C1F\u0C4D \u0C2C\u0C41\u0C15\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F";
      el = document.getElementById("payBtn");          if(el) el.textContent = "\u0C07\u0C2A\u0C4D\u0C2A\u0C41\u0C21\u0C41 \u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F";
      el = document.getElementById("servicesTitle");   if(el) el.textContent = "\u0C2E\u0C47\u0C2E\u0C41 \u0C38\u0C39\u0C3E\u0C2F\u0C02 \u0C1A\u0C47\u0C38\u0C47 \u0C38\u0C2E\u0C38\u0C4D\u0C2F\u0C32\u0C41";
      el = document.getElementById("servicesSub");     if(el) el.textContent = "\u0C35\u0C4D\u0C2F\u0C15\u0C4D\u0C24\u0C3F\u0C17\u0C24 \u0C38\u0C39\u0C1C \u0C35\u0C48\u0C26\u0C4D\u0C2F\u0C02 \u0C2E\u0C30\u0C3F\u0C2F\u0C41 \u0C1C\u0C40\u0C35\u0C28\u0C36\u0C48\u0C32\u0C3F \u0C38\u0C35\u0C30\u0C23.";
      el = document.getElementById("pricingTitle");    if(el) el.textContent = "\u0C15\u0C28\u0C4D\u0C38\u0C32\u0C4D\u0C1F\u0C47\u0C37\u0C28\u0C4D \u0C2A\u0C4D\u0C32\u0C3E\u0C28\u0C4D\u0C32\u0C41";
      el = document.getElementById("pricingSub");      if(el) el.textContent = "\u0C2E\u0C40\u0C15\u0C41 \u0C38\u0C30\u0C3F\u0C2A\u0C4B\u0C2F\u0C47 \u0C2A\u0C4D\u0C32\u0C3E\u0C28\u0C4D \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C02\u0C21\u0C3F.";
      el = document.getElementById("paymentTitle");    if(el) el.textContent = "\u0C2A\u0C47\u0C2E\u0C46\u0C02\u0C1F\u0C4D QR \u0C35\u0C3F\u0C2D\u0C3E\u0C17\u0C02";
      el = document.getElementById("paymentSub");      if(el) el.textContent = "QR \u0C15\u0C4B\u0C21\u0C4D \u0C38\u0C4D\u0C15\u0C3E\u0C28\u0C4D \u0C1A\u0C47\u0C38\u0C3F \u0C1A\u0C46\u0C32\u0C4D\u0C32\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F.";
      el = document.getElementById("bookingTitle");    if(el) el.textContent = "\u0C2E\u0C40 \u0C15\u0C28\u0C4D\u0C38\u0C32\u0C4D\u0C1F\u0C47\u0C37\u0C28\u0C4D \u0C2C\u0C41\u0C15\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F";
      el = document.getElementById("bookingSub");      if(el) el.textContent = "\u0C2B\u0C3E\u0C30\u0C02 \u0C28\u0C3F\u0C02\u0C2A\u0C3F\u0C24\u0C47 \u0C35\u0C3E\u0C1F\u0C4D\u0C38\u0C3E\u0C2A\u0C4D\u200C\u0C32\u0C4B \u0C2C\u0C41\u0C15\u0C3F\u0C02\u0C17\u0C4D \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C41 \u0C24\u0C46\u0C30\u0C41\u0C1A\u0C41\u0C15\u0C41\u0C02\u0C1F\u0C3E\u0C2F\u0C3F.";
      el = document.getElementById("formTitle");       if(el) el.textContent = "\u0C05\u0C2A\u0C3E\u0C2F\u0C3F\u0C02\u0C1F\u0C4D\u0C2E\u0C46\u0C02\u0C1F\u0C4D \u0C05\u0C2D\u0C4D\u0C2F\u0C30\u0C4D\u0C25\u0C28";
      el = document.getElementById("uploadLabel");     if(el) el.textContent = "\u0C2A\u0C47\u0C2E\u0C46\u0C02\u0C1F\u0C4D \u0C38\u0C4D\u0C15\u0C4D\u0C30\u0C40\u0C28\u0C4D\u200C\u0C37\u0C3E\u0C1F\u0C4D \u0C05\u0C2A\u0C4D\u0C32\u0C4B\u0C21\u0C4D \u0C1A\u0C47\u0C2F\u0C02\u0C21\u0C3F";
      el = document.getElementById("submitBtn");       if(el) el.textContent = "\u0C05\u0C2D\u0C4D\u0C2F\u0C30\u0C4D\u0C25\u0C28 \u0C2A\u0C02\u0C2A\u0C02\u0C21\u0C3F";
      el = document.getElementById("noteText");        if(el) el.textContent = "\u0C35\u0C3E\u0C1F\u0C4D\u0C38\u0C3E\u0C2A\u0C4D \u0C24\u0C46\u0C30\u0C41\u0C1A\u0C41\u0C15\u0C41\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F. \u0C38\u0C4D\u0C15\u0C4D\u0C30\u0C40\u0C28\u0C4D\u200C\u0C37\u0C3E\u0C1F\u0C4D \u0C35\u0C3F\u0C21\u0C3F\u0C17\u0C3E \u0C2A\u0C02\u0C2A\u0C02\u0C21\u0C3F.";
      el = document.getElementById("popupTitle");      if(el) el.textContent = "\u0C27\u0C28\u0C4D\u0C2F\u0C35\u0C3E\u0C26\u0C3E\u0C32\u0C41!";
      el = document.getElementById("popupText");       if(el) el.textContent = "\u0C2E\u0C40 \u0C35\u0C3F\u0C35\u0C30\u0C3E\u0C32\u0C41 \u0C38\u0C3F\u0C26\u0C4D\u0C27\u0C02\u0C17\u0C3E \u0C09\u0C28\u0C4D\u0C28\u0C3E\u0C2F\u0C3F. \u0C35\u0C3E\u0C1F\u0C4D\u0C38\u0C3E\u0C2A\u0C4D \u0C24\u0C46\u0C30\u0C41\u0C1A\u0C41\u0C15\u0C41\u0C02\u0C1F\u0C41\u0C02\u0C26\u0C3F.";
      el = document.getElementById("popupBtn");        if(el) el.textContent = "\u0C2E\u0C42\u0C38\u0C3F\u0C35\u0C47\u0C2F\u0C02\u0C21\u0C3F";
      el = document.getElementById("footerText");      if(el) el.textContent = "\u00A9 2025 \u0C28\u0C47\u0C1A\u0C41\u0C30\u0C4B\u0C2A\u0C24\u0C3F & \u0C2F\u0C4B\u0C17\u0C3E \u0C15\u0C47\u0C30\u0C4D. \u0C05\u0C28\u0C4D\u0C28\u0C3F \u0C39\u0C15\u0C4D\u0C15\u0C41\u0C32\u0C41 \u0C30\u0C3F\u0C1C\u0C30\u0C4D\u0C35\u0C4D \u0C1A\u0C47\u0C2F\u0C2C\u0C21\u0C4D\u0C21\u0C3E\u0C2F\u0C3F.";

      el = document.getElementById("name");            if(el) el.placeholder = "\u0C2E\u0C40 \u0C2A\u0C42\u0C30\u0C4D\u0C24\u0C3F \u0C2A\u0C47\u0C30\u0C41";
      el = document.getElementById("phone");           if(el) el.placeholder = "\u0C2B\u0C4B\u0C28\u0C4D \u0C28\u0C02\u0C2C\u0C30\u0C4D";
      el = document.getElementById("email");           if(el) el.placeholder = "\u0C08\u0C2E\u0C46\u0C2F\u0C3F\u0C32\u0C4D \u0C05\u0C21\u0C4D\u0C30\u0C46\u0C38\u0C4D";
      el = document.getElementById("transactionId");   if(el) el.placeholder = "\u0C1F\u0C4D\u0C30\u0C3E\u0C28\u0C4D\u0C38\u0C3E\u0C15\u0C4D\u0C37\u0C28\u0C4D ID / UTR \u0C28\u0C02\u0C2C\u0C30\u0C4D";
      el = document.getElementById("message");         if(el) el.placeholder = "\u0C2E\u0C40 \u0C06\u0C30\u0C4B\u0C17\u0C4D\u0C2F \u0C38\u0C2E\u0C38\u0C4D\u0C2F\u0C28\u0C41 \u0C35\u0C3F\u0C35\u0C30\u0C3F\u0C02\u0C1A\u0C02\u0C21\u0C3F";
      if (fileName) fileName.textContent = "\u0C0F \u0C2B\u0C48\u0C32\u0C4D \u0C0E\u0C02\u0C1A\u0C41\u0C15\u0C4B\u0C32\u0C47\u0C26\u0C41";

    } else {
      location.reload();
    }
  });
}

// =============================================
// WELLNESS TAB — DATA
// =============================================
var wellnessData = {

  yoga: [
    {
      icon: "🧘",
      title: "Surya Namaskar",
      conditions: ["all","pcos","thyroid","diabetes","weight","stress"],
      items: ["12-step sun salutation flow","Stimulates endocrine glands","Boosts metabolism & circulation","Improves flexibility & core strength"],
      duration: "15-20 min daily"
    },
    {
      icon: "🌀",
      title: "Setu Bandhasana (Bridge Pose)",
      conditions: ["all","pcos","thyroid","stress","bp"],
      items: ["Stimulates thyroid & pituitary glands","Reduces lower back pain","Calms nervous system","Improves blood circulation"],
      duration: "5-10 min daily"
    },
    {
      icon: "🦋",
      title: "Baddha Konasana (Butterfly)",
      conditions: ["all","pcos","weight","digestive"],
      items: ["Opens hips & pelvis","Supports reproductive health","Stimulates abdominal organs","Relieves menstrual discomfort"],
      duration: "10 min daily"
    },
    {
      icon: "🌿",
      title: "Bhujangasana (Cobra Pose)",
      conditions: ["all","thyroid","joint","digestive","bp"],
      items: ["Strengthens spine & back muscles","Stimulates thyroid gland","Improves digestion","Opens chest & lungs"],
      duration: "5 min daily"
    },
    {
      icon: "⚡",
      title: "Trikonasana (Triangle Pose)",
      conditions: ["all","weight","diabetes","bp","joint"],
      items: ["Stretches hips, groin & hamstrings","Stimulates abdominal organs","Improves balance & stamina","Helps manage blood sugar"],
      duration: "5-8 min daily"
    },
    {
      icon: "🌊",
      title: "Paschimottanasana",
      conditions: ["all","stress","digestive","diabetes","weight"],
      items: ["Stretches lower back & hamstrings","Massages abdominal organs","Calms the mind & reduces stress","Improves digestion & metabolism"],
      duration: "5-10 min daily"
    },
    {
      icon: "🌙",
      title: "Shavasana (Corpse Pose)",
      conditions: ["all","stress","bp","skin"],
      items: ["Complete body relaxation","Reduces cortisol levels","Promotes deep rest & recovery","Improves sleep quality"],
      duration: "10-15 min daily"
    },
    {
      icon: "🔥",
      title: "Ardha Matsyendrasana (Spinal Twist)",
      conditions: ["all","diabetes","digestive","weight","skin"],
      items: ["Massages pancreas & kidneys","Helps regulate blood sugar","Detoxifies abdominal organs","Improves spinal mobility"],
      duration: "5 min daily"
    },
    {
      icon: "🏔",
      title: "Virabhadrasana (Warrior Pose)",
      conditions: ["all","joint","weight","stress"],
      items: ["Strengthens legs & core","Builds endurance & willpower","Reduces knee & hip stiffness","Boosts confidence & focus"],
      duration: "8-10 min daily"
    }
  ],

  pranayam: [
    {
      icon: "🌬",
      title: "Anulom Vilom (Alternate Nostril)",
      conditions: ["all","stress","bp","thyroid","pcos","diabetes"],
      items: ["Balances left & right brain hemispheres","Reduces anxiety and stress","Regulates blood pressure naturally","Improves overall lung capacity"],
      duration: "10-15 min daily"
    },
    {
      icon: "🐝",
      title: "Bhramari (Humming Bee Breath)",
      conditions: ["all","stress","bp","thyroid","pcos"],
      items: ["Calms the nervous system instantly","Reduces anxiety & frustration","Stimulates vagus nerve","Helps with insomnia & sleep issues"],
      duration: "5-10 min daily"
    },
    {
      icon: "🔥",
      title: "Kapalabhati (Skull Shining Breath)",
      conditions: ["all","weight","diabetes","digestive","skin","pcos"],
      items: ["Detoxifies respiratory system","Boosts metabolism rapidly","Strengthens abdominal muscles","Improves blood circulation & skin glow"],
      duration: "5-10 min morning"
    },
    {
      icon: "❄",
      title: "Sheetali (Cooling Breath)",
      conditions: ["all","bp","skin","stress","diabetes"],
      items: ["Cools the body temperature","Reduces high blood pressure","Calms anger & anxiety quickly","Helps with skin heat disorders"],
      duration: "5-8 min daily"
    },
    {
      icon: "🌊",
      title: "Ujjayi (Ocean Breath)",
      conditions: ["all","thyroid","stress","joint","bp"],
      items: ["Massages thyroid gland with vibration","Generates internal body heat","Calms racing thoughts","Improves focus & endurance"],
      duration: "8-10 min daily"
    },
    {
      icon: "💨",
      title: "Bhastrika (Bellows Breath)",
      conditions: ["all","weight","diabetes","thyroid","digestive"],
      items: ["Energises the entire body","Boosts metabolic rate","Clears nasal passages","Strengthens lungs & diaphragm"],
      duration: "5 min morning"
    },
    {
      icon: "🌸",
      title: "Nadi Shodhana (Channel Cleansing)",
      conditions: ["all","pcos","thyroid","stress","skin"],
      items: ["Purifies energy channels (nadis)","Balances hormonal system","Reduces brain fog & fatigue","Promotes emotional stability"],
      duration: "10 min daily"
    },
    {
      icon: "☀",
      title: "Surya Bhedana (Right Nostril Breath)",
      conditions: ["all","weight","diabetes","thyroid","digestive"],
      items: ["Activates sympathetic nervous system","Increases digestive fire (agni)","Warms the body & boosts energy","Helpful in low blood pressure"],
      duration: "5 min morning"
    },
    {
      icon: "🌙",
      title: "Chandra Bhedana (Left Nostril Breath)",
      conditions: ["all","bp","stress","skin","joint"],
      items: ["Activates parasympathetic system","Cools body & reduces heat","Reduces high blood pressure","Promotes deep sleep at night"],
      duration: "5 min before bed"
    }
  ],

  relaxation: [
    {
      icon: "🛁",
      title: "Progressive Muscle Relaxation",
      conditions: ["all","stress","joint","bp","skin"],
      items: ["Tense & release each muscle group","Reduces physical tension head-to-toe","Lowers cortisol & blood pressure","Improves body awareness"],
      duration: "15-20 min daily"
    },
    {
      icon: "🌊",
      title: "Deep Abdominal Breathing",
      conditions: ["all","stress","bp","digestive","pcos"],
      items: ["Activates parasympathetic system","Slows heart rate naturally","Reduces digestive tension","Calms overthinking & anxiety"],
      duration: "10 min daily"
    },
    {
      icon: "🧖",
      title: "Yoga Nidra (Yogic Sleep)",
      conditions: ["all","stress","pcos","thyroid","skin"],
      items: ["45-min guided deep relaxation","Heals at subconscious level","Balances hormones & nervous system","Equal to 3 hours of normal sleep"],
      duration: "30-45 min daily"
    },
    {
      icon: "🌿",
      title: "Shavasana Relaxation",
      conditions: ["all","stress","bp","joint","diabetes"],
      items: ["Complete stillness of body & mind","Releases accumulated tension","Integrates yoga practice benefits","Restores energy levels"],
      duration: "10-15 min after yoga"
    },
    {
      icon: "🎵",
      title: "OM Chanting & Sound Therapy",
      conditions: ["all","stress","thyroid","bp","pcos"],
      items: ["OM vibration massages thyroid","Activates vagal tone","Reduces anxiety & depression","Creates inner calm & peace"],
      duration: "10 min daily"
    },
    {
      icon: "🌅",
      title: "Guided Visualisation",
      conditions: ["all","stress","skin","pcos","weight"],
      items: ["Positive imagery for healing","Reduces chronic stress hormones","Improves immune response","Builds mind-body connection"],
      duration: "15 min daily"
    },
    {
      icon: "🤲",
      title: "Acupressure Self-Therapy",
      conditions: ["all","digestive","joint","stress","bp"],
      items: ["Pressure points for digestion","Points for pain & joint relief","Reduces headache & tension","Easy to practice at home"],
      duration: "10 min daily"
    },
    {
      icon: "💆",
      title: "Head & Neck Relaxation",
      conditions: ["all","stress","joint","bp","thyroid"],
      items: ["Relieves cervical tension","Reduces stress headaches","Improves neck & shoulder mobility","Activates relaxation response"],
      duration: "5-8 min daily"
    },
    {
      icon: "🌙",
      title: "Bedtime Wind-Down Routine",
      conditions: ["all","stress","weight","diabetes","skin"],
      items: ["Gentle stretches before sleep","Breathing sequence for rest","Digital detox guidance","Improves sleep quality & depth"],
      duration: "15-20 min nightly"
    }
  ],

  meditation: [
    {
      icon: "🧠",
      title: "Mindfulness Meditation",
      conditions: ["all","stress","weight","bp","skin"],
      items: ["Non-judgmental present-moment awareness","Reduces emotional eating patterns","Lowers cortisol & inflammation","Trains focused attention"],
      duration: "15-20 min daily"
    },
    {
      icon: "🕯",
      title: "Trataka (Candle Gazing)",
      conditions: ["all","stress","thyroid","pcos"],
      items: ["Improves concentration & eye health","Stimulates pineal & pituitary glands","Balances hormonal signals","Develops inner stillness"],
      duration: "10-15 min daily"
    },
    {
      icon: "🌸",
      title: "Loving Kindness (Metta) Meditation",
      conditions: ["all","stress","pcos","skin","bp"],
      items: ["Cultivates compassion & self-love","Reduces negative thought patterns","Lowers blood pressure & heart rate","Heals emotional wounds"],
      duration: "15 min daily"
    },
    {
      icon: "🌬",
      title: "Breath Awareness Meditation",
      conditions: ["all","stress","diabetes","bp","digestive"],
      items: ["Anchors mind to breath sensation","Reduces anxiety & panic attacks","Regulates autonomic nervous system","Suitable for absolute beginners"],
      duration: "10-20 min daily"
    },
    {
      icon: "🔮",
      title: "Chakra Balancing Meditation",
      conditions: ["all","pcos","thyroid","stress","skin"],
      items: ["Balances 7 energy centres","Targets specific glands & organs","Restores hormonal harmony","Clears emotional blockages"],
      duration: "20-30 min daily"
    },
    {
      icon: "🌿",
      title: "Body Scan Meditation",
      conditions: ["all","joint","stress","diabetes","bp"],
      items: ["Systematic awareness of each body part","Identifies & releases pain points","Reduces chronic pain perception","Deepens mind-body connection"],
      duration: "20 min daily"
    },
    {
      icon: "📿",
      title: "Mantra Meditation (So-Hum / OM)",
      conditions: ["all","thyroid","pcos","stress","bp"],
      items: ["Vibrational healing through sound","So-Hum synchronises with breath","Stills mental chatter quickly","Balances nervous & hormonal system"],
      duration: "15-20 min daily"
    },
    {
      icon: "🌅",
      title: "Morning Intention Setting",
      conditions: ["all","weight","diabetes","stress","pcos"],
      items: ["Sets positive tone for the day","Aligns mind with healing goals","Reduces decision fatigue","Boosts motivation & compliance"],
      duration: "5-10 min every morning"
    },
    {
      icon: "🍃",
      title: "Nature Visualisation Meditation",
      conditions: ["all","stress","skin","bp","digestive"],
      items: ["Imagining healing nature scenes","Reduces physical stress response","Lowers blood pressure & heart rate","Improves mood & skin health"],
      duration: "15 min daily"
    }
  ]
};

// =============================================
// WELLNESS — STATE
// =============================================
var activeTab       = "yoga";
var activeCondition = "all";

// =============================================
// WELLNESS — SWITCH TAB
// =============================================
function switchWTab(tab, btn) {
  document.querySelectorAll(".wellness-panel").forEach(function(p) {
    p.classList.remove("active");
  });
  document.querySelectorAll(".w-tab-btn").forEach(function(b) {
    b.classList.remove("active");
  });

  var panel = document.getElementById("panel-" + tab);
  if (panel) panel.classList.add("active");
  if (btn)   btn.classList.add("active");

  activeTab = tab;
  renderWellness();
}

// =============================================
// WELLNESS — FILTER BY CONDITION
// =============================================
function filterWellness() {
  var select = document.getElementById("wellnessCondition");
  activeCondition = select ? select.value : "all";
  renderWellness();
}

// =============================================
// WELLNESS — RENDER CARDS
// =============================================
function renderWellness() {
  var tabs = ["yoga", "pranayam", "relaxation", "meditation"];

  tabs.forEach(function(tab) {
    var gridEl = document.getElementById(tab + "-grid");
    if (!gridEl) return;

    var data = wellnessData[tab];
    if (!data) return;

    var filtered = data.filter(function(item) {
      return activeCondition === "all" ||
             item.conditions.indexOf("all") !== -1 ||
             item.conditions.indexOf(activeCondition) !== -1;
    });

    if (filtered.length === 0) {
      gridEl.innerHTML =
        '<div class="wp-empty">' +
        'No specific techniques found for this condition.<br>' +
        'Please try another tab or select "All Conditions".' +
        '</div>';
      return;
    }

    var html = "";
    filtered.forEach(function(item) {
      var listItems = item.items.map(function(li) {
        return "<li>" + li + "</li>";
      }).join("");

      html +=
        '<div class="wp-card">' +
          '<div class="wp-icon">' + item.icon + '</div>' +
          '<h4>' + item.title + '</h4>' +
          '<ul>' + listItems + '</ul>' +
          '<span class="duration-tag">&#9201; ' + item.duration + '</span>' +
        '</div>';
    });

    gridEl.innerHTML = html;
  });
}

// =============================================
// INIT — run on page load
// =============================================
document.addEventListener("DOMContentLoaded", function () {
  renderWellness();
});

// Naturopathy Food Tabs
function switchFoodTab(tab, el) {
  document.querySelectorAll('.food-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.food-tab-btn').forEach(b => b.classList.remove('active'));
  document.getElementById('panel-food-' + tab).classList.add('active');
  el.classList.add('active');
}

/* ============================================ */
/*   LIVE REVIEWS — JSONBin.io                 */
/*   All visitors see ALL reviews              */
/*   Stars fully working                       */
/* ============================================ */

(function () {

  /* ================================================= */
  /* ⚠️  PASTE YOUR OWN VALUES HERE (from Steps 2 & 3) */
  /* ================================================= */
  var BIN_ID     = '69f37a77856a6821898f56ad';       /* e.g. 6xxxxxxxxxxxxxxxxxxxxxxx   */
  var MASTER_KEY = '$2a$10$.YEX/A9CjVSV43PGh6oo7e/ec.nIO2pWx0d/OOqHgkosboU3gzVBi';   /* e.g. \$2a$10$xxxxxxxxxxxxx...     */
  /* ================================================= */

  var BASE_URL = 'https://api.jsonbin.io/v3/b/' + BIN_ID;

  /* ---- Rating label text ---- */
  var RATING_LABELS = {
    1 : '⭐ Poor',
    2 : '⭐⭐ Fair',
    3 : '⭐⭐⭐ Good',
    4 : '⭐⭐⭐⭐ Very Good',
    5 : '⭐⭐⭐⭐⭐ Excellent!'
  };

  var selectedRating = 0;

  /* Get elements */
  var starContainer = document.getElementById('starRating');
  var stars         = starContainer
                        ? Array.prototype.slice.call(
                            starContainer.querySelectorAll('.star')
                          )
                        : [];
  var ratingInput   = document.getElementById('reviewRating');
  var ratingLabel   = document.getElementById('ratingLabel');
  var textarea      = document.getElementById('reviewText');
  var charCount     = document.getElementById('charCount');
  var submitBtn     = document.getElementById('reviewSubmitBtn');


  /* =============================== */
  /*   STAR RATING — Full Logic      */
  /* =============================== */

  /* Light up stars 0 to count */
  function highlightStars(count) {
    stars.forEach(function (s, index) {
      if (index < count) {
        s.classList.add('lit');
      } else {
        s.classList.remove('lit');
      }
    });
  }

  /* Update text label below stars */
  function updateRatingLabel(count) {
    if (ratingLabel) {
      ratingLabel.textContent = RATING_LABELS[count] || 'No rating selected';
    }
  }

  /* Attach star events */
  if (stars.length) {

    stars.forEach(function (star) {

      /* Hover — light preview */
      star.addEventListener('mouseenter', function () {
        var val = parseInt(this.getAttribute('data-value'));
        highlightStars(val);
        updateRatingLabel(val);
      });

      /* Mouse leave — restore locked rating */
      star.addEventListener('mouseleave', function () {
        highlightStars(selectedRating);
        updateRatingLabel(selectedRating);
      });

      /* Click — lock rating */
      star.addEventListener('click', function () {
        selectedRating = parseInt(this.getAttribute('data-value'));
        if (ratingInput) ratingInput.value = selectedRating;
        highlightStars(selectedRating);
        updateRatingLabel(selectedRating);
      });

    });
  }


  /* =============================== */
  /*   CHARACTER COUNT               */
  /* =============================== */

  if (textarea && charCount) {
    textarea.addEventListener('input', function () {
      var len           = this.value.length;
      charCount.textContent = len + ' / 500 characters';
      charCount.style.color = len > 450 ? '#e74c3c' : '#8aada6';
    });
  }


  /* =============================== */
  /*   ESCAPE HTML — Security        */
  /* =============================== */

  function escapeHTML(str) {
    return String(str)
      .replace(/&/g,  '&amp;')
      .replace(/</g,  '&lt;')
      .replace(/>/g,  '&gt;')
      .replace(/"/g,  '&quot;')
      .replace(/'/g,  '&#039;');
  }


  /* =============================== */
  /*   BUILD ONE REVIEW CARD HTML    */
  /* =============================== */

  function buildCard(review) {
    var rating = Math.min(5, Math.max(0, parseInt(review.rating) || 0));

    /* Build star strings */
    var filledStars = '';
    var emptyStars  = '';
    for (var f = 0; f < rating;     f++) { filledStars += '★'; }
    for (var e = 0; e < 5 - rating; e++) { emptyStars  += '☆'; }

    var initial     = escapeHTML((review.name || 'A').charAt(0).toUpperCase());
    var condHTML    = (review.condition && review.condition.trim() !== '')
      ? '<div class="review-condition">🌿 ' + escapeHTML(review.condition) + '</div>'
      : '';

    return (
      '<div class="review-card">' +

        '<div class="review-header">' +
          '<div class="review-avatar">' + initial + '</div>' +
          '<div class="review-info">' +
            '<div class="review-name">'  + escapeHTML(review.name || '') + '</div>' +
            condHTML +
            '<div class="review-date">'  + escapeHTML(review.date || '') + '</div>' +
          '</div>' +
        '</div>' +

        '<div class="review-stars">' +
          '<span style="color:#f59e0b;">' + filledStars + '</span>' +
          '<span style="color:#d1d5db;">' + emptyStars  + '</span>' +
        '</div>' +

        '<p class="review-text">' + escapeHTML(review.text || '') + '</p>' +

      '</div>'
    );
  }


  /* =============================== */
  /*   SHOW STATUS MESSAGE           */
  /* =============================== */

  function showMsg(text, isSuccess) {
    var msgEl = document.getElementById('reviewMsg');
    if (!msgEl) return;
    msgEl.textContent      = text;
    msgEl.style.display    = 'block';
    msgEl.style.color      = isSuccess ? '#0a5c4d'  : '#c0392b';
    msgEl.style.background = isSuccess ? '#eefaf6'  : '#fff0f0';
    msgEl.style.border     = isSuccess
      ? '1px solid #a7ddd0'
      : '1px solid #f5c6cb';

    /* Auto hide success after 5 seconds */
    if (isSuccess) {
      setTimeout(function () {
        msgEl.style.display = 'none';
      }, 5000);
    }
  }


  /* =============================== */
  /*   RENDER REVIEWS TO PAGE        */
  /* =============================== */

  function renderReviews(reviews) {
    var container = document.getElementById('reviewsContainer');
    var noMsg     = document.getElementById('noReviewsMsg');
    if (!container) return;

    /* Remove old cards */
    var oldCards = container.querySelectorAll('.review-card');
    oldCards.forEach(function (c) { c.remove(); });

    if (!reviews || reviews.length === 0) {
      if (noMsg) {
        noMsg.style.display = 'block';
        noMsg.textContent   = '🌿 Be the first to share your experience!';
      }
      return;
    }

    if (noMsg) noMsg.style.display = 'none';

    /* Newest first */
    var sorted = reviews.slice().reverse();
    sorted.forEach(function (review) {
      container.insertAdjacentHTML('beforeend', buildCard(review));
    });
  }


  /* =============================== */
  /*   LOAD REVIEWS FROM JSONBIN     */
  /* =============================== */

  function loadReviews() {
    var noMsg = document.getElementById('noReviewsMsg');
    if (noMsg) {
      noMsg.style.display = 'block';
      noMsg.textContent   = '⏳ Loading reviews...';
    }

    fetch(BASE_URL + '/latest', {
      method  : 'GET',
      headers : {
        'X-Master-Key'    : MASTER_KEY,
        'X-Bin-Meta'      : 'false'      /* Returns only the record, no metadata */
      }
    })
    .then(function (res) {
      if (!res.ok) { throw new Error('Failed to load: ' + res.status); }
      return res.json();
    })
    .then(function (data) {
      /* JSONBin wraps data in { record: { reviews: [...] } }        */
      /* With X-Bin-Meta: false it returns { reviews: [...] } directly */
      var reviews = [];
      if (data && data.reviews) {
        reviews = data.reviews;
      } else if (data && data.record && data.record.reviews) {
        reviews = data.record.reviews;
      }
      renderReviews(reviews);
    })
    .catch(function (err) {
      console.error('Load error:', err);
      var noMsg2 = document.getElementById('noReviewsMsg');
      if (noMsg2) {
        noMsg2.style.display = 'block';
        noMsg2.textContent   = '🌿 Reviews could not be loaded. Please refresh.';
      }
    });
  }


  /* =============================== */
  /*   SUBMIT REVIEW → JSONBIN       */
  /* =============================== */

  if (submitBtn) {
    submitBtn.addEventListener('click', function () {

      /* Collect form values */
      var name      = document.getElementById('reviewName').value.trim();
      var condition = document.getElementById('reviewCondition').value.trim();
      var text      = textarea
                        ? textarea.value.trim()
                        : document.getElementById('reviewText').value.trim();
      var rating    = parseInt(
                        ratingInput
                          ? ratingInput.value
                          : document.getElementById('reviewRating').value
                      );

      /* ---- Validate ---- */
      if (!name) {
        showMsg('❌ Please enter your full name.', false);
        document.getElementById('reviewName').focus();
        return;
      }

      if (!rating || rating < 1) {
        showMsg('⭐ Please click a star to give your rating.', false);
        return;
      }

      if (!text || text.length < 10) {
        showMsg('❌ Please write at least 10 characters in your review.', false);
        if (textarea) textarea.focus();
        return;
      }

      /* Disable button */
      submitBtn.disabled    = true;
      submitBtn.textContent = '⏳ Submitting...';

      /* Today date */
      var today = new Date().toLocaleDateString('en-IN', {
        day   : 'numeric',
        month : 'short',
        year  : 'numeric'
      });

      /* New review object */
      var newReview = {
        name      : name,
        condition : condition,
        text      : text,
        rating    : rating,
        date      : today
      };

      /* Step 1: GET current reviews from JSONBin */
      fetch(BASE_URL + '/latest', {
        method  : 'GET',
        headers : {
          'X-Master-Key' : MASTER_KEY,
          'X-Bin-Meta'   : 'false'
        }
      })
      .then(function (res) {
        if (!res.ok) { throw new Error('Fetch error: ' + res.status); }
        return res.json();
      })
      .then(function (data) {

        /* Get existing reviews array */
        var existing = [];
        if (data && data.reviews) {
          existing = data.reviews;
        } else if (data && data.record && data.record.reviews) {
          existing = data.record.reviews;
        }

        /* Add new review to end */
        existing.push(newReview);

        /* Step 2: PUT updated array back to JSONBin */
        return fetch(BASE_URL, {
          method  : 'PUT',
          headers : {
            'Content-Type' : 'application/json',
            'X-Master-Key' : MASTER_KEY
          },
          body : JSON.stringify({ reviews: existing })
        });

      })
      .then(function (putRes) {
        if (!putRes.ok) { throw new Error('Save error: ' + putRes.status); }
        return putRes.json();
      })
      .then(function () {

        /* Reset form */
        document.getElementById('reviewForm').reset();
        selectedRating = 0;
        if (ratingInput) ratingInput.value = 0;
        highlightStars(0);
        updateRatingLabel(0);
        if (charCount) charCount.textContent = '0 / 500 characters';

        /* Success */
        showMsg('✅ Thank you! Your review is now live for everyone to see! 🎉', true);

        /* Reload reviews after short wait */
        setTimeout(loadReviews, 1500);

      })
      .catch(function (err) {
        console.error('Submit error:', err);
        showMsg('❌ Something went wrong. Please try again.', false);
      })
      .finally(function () {
        submitBtn.disabled    = false;
        submitBtn.textContent = '⭐ Submit Review';
      });

    });
  }


  /* =============================== */
  /*   START — Load reviews on ready */
  /* =============================== */

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadReviews);
  } else {
    loadReviews();
  }

})();
