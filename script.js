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
