(function () {
  const iframe = document.createElement("iframe");
  iframe.src = "https://my-chatbot.vercel.app"; // 🔁 Replace with your deployed chatbot URL
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "400px";
  iframe.style.height = "500px";
  iframe.style.border = "none";
  iframe.style.zIndex = "9999";
  iframe.style.borderRadius = "12px";
  iframe.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
  document.body.appendChild(iframe);
})();
