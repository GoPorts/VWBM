async function loadRemotePage() {
  const input = document.getElementById("urlInput").value.trim();
  const url = input.startsWith("http") ? input : "https://" + input;

  const status = document.getElementById("statusMsg");
  const frame = document.getElementById("remoteFrame");
  status.textContent = "Loading via proxy...";

  try {
    const res = await fetch("https://your-proxy-url.com/browse", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });

    const html = await res.text();
    const blob = new Blob([html], { type: "text/html" });
    frame.src = URL.createObjectURL(blob);

    status.textContent = "✅ Loaded";
  } catch (err) {
    status.textContent = "❌ Proxy error: " + err.message;
  }
}
