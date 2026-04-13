const fileInput = document.getElementById("paymentScreenshot");
const fileName = document.getElementById("fileName");
const form = document.getElementById("whatsappForm");
const popup = document.getElementById("thankYouPopup");
const langToggle = document.getElementById("langToggle");

let teluguMode = false;

fileInput.addEventListener("change", function () {
  if (this.files.length > 0) {
    fileName.textContent = "Selected file: " + this.files[0].name;
  } else {
    fileName.textContent = "No file selected";
  }
});

document.getElementById("submitBtn").addEventListener("click", function () {

  const name          = document.getElementById("name").value.trim();
  const phone         = document.getElementById("phone").value.trim();
  const email         = document.getElementById("email").value.trim();
  const plan          = document.getElementById("plan").value;
  const date          = document.getElementById("date").value;
  const time          = document.getElementById("time").value;
  const paymentStatus = document.getElementById("paymentStatus").value;
  const transactionId = document.getElementById("transactionId").value.trim();
  const message       = document.getElementById("message").value.trim();
  const screenshotSelected = fileInput.files.length > 0 ? "Yes" : "No";

  // Validation
  if (!name)          { alert("Please enter your full name.");        return; }
  if (!phone)         { alert("Please enter your phone number.");     return; }
  if (!plan)          { alert("Please select consultation type.");    return; }
  if (!date)          { alert("Please select a preferred date.");     return; }
  if (!time)          { alert("Please select a preferred time.");     return; }
  if (!paymentStatus) { alert("Please select your payment status."); return; }

  const whatsappNumber = "917013989526";

  let text = "";

  if (!teluguMode) {
    text =
`Hello Doctor 🙏 I would like to book an appointment.

Name: ${name}
Phone: ${phone}
Email: ${email || "Not provided"}
Consultation Type: ${plan}
Preferred Date: ${date}
Preferred Time: ${time}
Payment Status: ${paymentStatus}
Transaction ID: ${transactionId || "Not provided"}
Screenshot: ${screenshotSelected}
Health Concern: ${message || "Not mentioned"}

Note: If screenshot selected I will send it manually.`;
  } else {
    text =
`నమస్కారం డాక్టర్ గారు 🙏 నాకు అపాయింట్మెంట్ బుక్ చేయాలి.

పేరు: ${name}
ఫోన్: ${phone}
ఈమెయిల్: ${email || "ఇవ్వలేదు"}
కన్సల్టేషన్ రకం: ${plan}
తేదీ: ${date}
సమయం: ${time}
చెల్లింపు స్థితి: ${paymentStatus}
ట్రాన్సాక్షన్ ఐడి: ${transactionId || "ఇవ్వలేదు"}
స్క్రీన్‌షాట్: ${screenshotSelected}
ఆరోగ్య సమస్య: ${message || "ఇవ్వలేదు"}`;
  }

  const url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(text);

  // ✅ Create invisible <a> tag and click it
  // This is the most reliable way that works everywhere
  const link    = document.createElement("a");
  link.href     = url;
  link.target   = "_blank";
  link.rel      = "noopener noreferrer";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  // Show popup
  popup.style.display = "flex";

  // Reset form
  form.reset();
  fileName.textContent = teluguMode ? "ఏ ఫైల్ ఎంచుకోలేదు" : "No file selected";
});

function closePopup() {
  popup.style.display = "none";
}

langToggle.addEventListener("click", function () {
  teluguMode = !teluguMode;

  if (teluguMode) {
    document.documentElement.lang = "te";
    langToggle.textContent = "English";
    document.getElementById("badgeText").textContent       = "ఆధారపూర్వక సహజ వైద్యం";
    document.getElementById("heroTitle").textContent       = "ఆన్‌లైన్ నేచురోపతి & యోగా కన్సల్టేషన్";
    document.getElementById("heroDesc").textContent        = "అర్హత కలిగిన నిపుణుల నుండి వ్యక్తిగత నేచురోపతి, డైట్, యోగా మరియు జీవనశైలి మార్గదర్శకత్వంతో సహజంగా ఆరోగ్యం పొందండి.";
    document.getElementById("bookBtn").textContent         = "అపాయింట్మెంట్ బుక్ చేయండి";
    document.getElementById("payBtn").textContent          = "ఇప్పుడు చెల్లించండి";
    document.getElementById("servicesTitle").textContent   = "మేము సహాయం చేసే సమస్యలు";
    document.getElementById("servicesSub").textContent     = "వ్యక్తిగత సహజ వైద్యం మరియు జీవనశైలి సవరణ.";
    document.getElementById("pricingTitle").textContent    = "కన్సల్టేషన్ ప్లాన్లు";
    document.getElementById("pricingSub").textContent      = "మీకు సరిపోయే ప్లాన్ ఎంచుకోండి.";
    document.getElementById("paymentTitle").textContent    = "పేమెంట్ QR విభాగం";
    document.getElementById("paymentSub").textContent      = "QR కోడ్ స్కాన్ చేసి చెల్లించండి.";
    document.getElementById("bookingTitle").textContent    = "మీ కన్సల్టేషన్ బుక్ చేయండి";
    document.getElementById("bookingSub").textContent      = "ఫారం నింపితే వాట్సాప్‌లో బుకింగ్ వివరాలు తెరుచుకుంటాయి.";
    document.getElementById("formTitle").textContent       = "అపాయింట్మెంట్ అభ్యర్థన";
    document.getElementById("uploadLabel").textContent     = "పేమెంట్ స్క్రీన్‌షాట్ అప్లోడ్ చేయండి";
    document.getElementById("submitBtn").textContent       = "అభ్యర్థన పంపండి";
    document.getElementById("noteText").textContent        = "వాట్సాప్ తెరుచుకుంటుంది. స్క్రీన్‌షాట్ విడిగా పంపండి.";
    document.getElementById("popupTitle").textContent      = "ధన్యవాదాలు!";
    document.getElementById("popupText").textContent       = "మీ వివరాలు సిద్ధంగా ఉన్నాయి. వాట్సాప్ తెరుచుకుంటుంది.";
    document.getElementById("popupBtn").textContent        = "మూసివేయండి";
    document.getElementById("footerText").textContent      = "© 2025 నేచురోపతి & యోగా కేర్. అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.";
    document.getElementById("name").placeholder            = "మీ పూర్తి పేరు";
    document.getElementById("phone").placeholder           = "ఫోన్ నంబర్";
    document.getElementById("email").placeholder           = "ఈమెయిల్ అడ్రెస్";
    document.getElementById("transactionId").placeholder   = "ట్రాన్సాక్షన్ ID / UTR నంబర్";
    document.getElementById("message").placeholder         = "మీ ఆరోగ్య సమస్యను వివరించండి";
    fileName.textContent = "ఏ ఫైల్ ఎంచుకోలేదు";
  } else {
    location.reload();
  }
});
