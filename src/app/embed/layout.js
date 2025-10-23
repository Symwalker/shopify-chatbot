export const runtime = 'edge';

export default function EmbedLayout({ children }) {
  // Minimal layout for embed page — force transparent background so the iframe
  // doesn't show the site's global background (which can be dark).
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>{`html,body,#root,#__next{height:100%;background:transparent!important;margin:0;padding:0} body{overflow:hidden}`}</style>
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
