// Builds the FAQPage structured data from the editable FAQs on the home page.
const home = require("./home.json");

module.exports = (home.faqs || []).map((f) => ({
  "@type": "Question",
  name: f.q,
  acceptedAnswer: { "@type": "Answer", text: f.a },
}));
