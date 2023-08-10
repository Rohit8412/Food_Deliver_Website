export const API_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:4000"
  : "https://poised-yak-hose.cyclic.app";

export const CLIENT_URL = window.location.hostname.includes("localhost")
  ? "http://localhost:3000"
  : "https://zomato-cl.netlify.app/delivery";

// module.exports = API_URL;
// module.exports = CLIENT_URL;
