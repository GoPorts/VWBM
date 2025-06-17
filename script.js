// Update user IP
async function fetchIP() {
  const ipBox = document.getElementById("ipData");
  try {
    const res = await fetch("https://ipapi.co/json");
    const data = await res.json();
    ipBox.textContent = `${data.ip} (${data.city}, ${data.country_name})`;
  } catch {
    ipBox.textContent = "Error fetching IP";
  }
}

// Load site through optional proxy
function loadSite() {
  const urlInput = document.getElementById("urlInput").value.trim();
  const proxy = document.getElementById("proxySelect").value;
  const iframe = document.getElementById("browserFrame");

  if (!urlInput) {
    alert("Please enter a valid URL.");
    return;
  }

  let fullURL = urlInput.startsWith("http") ? urlInput : `https://${urlInput}`;
  if (proxy) {
    fullURL = proxy + encodeURIComponent(fullURL);
  }

  iframe.src = fullURL;
}

// Load IP on start
fetchIP();
