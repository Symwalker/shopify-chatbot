import ShopifyChatbot from "@/components/ShopifyChatbot";

export const runtime = "edge"; // optional, remove if you don't want edge runtime

export default function EmbedPage() {
  // Minimal page for embedding via iframe. Render only the widget so it behaves
  // correctly when loaded inside another site (Shopify etc.).
  return (
    <div style={{ width: "100%", height: "100%", background: "transparent" }}>
      <ShopifyChatbot />
    </div>
  );
}
