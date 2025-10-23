(function () {
  const iframe = document.createElement("iframe");

  // Use the embed-only page (deploy or local replace accordingly)
  iframe.src = "https://shopify-chatbot-phi.vercel.app/embed"; // <-- point to the minimal embed page

  // Match sizes to your widget: your component uses w-96 (~384px) and h-[600px]
  iframe.style.position = "fixed";
  iframe.style.bottom = "20px";
  iframe.style.right = "20px";
  iframe.style.width = "384px";  // match component width (w-96)
  iframe.style.height = "600px"; // match component height
  iframe.style.border = "none";
  iframe.style.zIndex = "9999";
  iframe.style.borderRadius = "12px";
  iframe.style.boxShadow = "0 8px 30px rgba(0,0,0,0.25)";
  iframe.style.background = "transparent";

  // allow transparency and scripts inside iframe
  iframe.setAttribute("allowtransparency", "true");
  iframe.setAttribute("sandbox", "allow-scripts allow-same-origin allow-forms");

  document.body.appendChild(iframe);
})();