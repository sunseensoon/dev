import "./globals.css";

export const metadata = {
 title: "Minguri URL Shortener",
 description: "Shorten links"
};

export default function RootLayout({ children }) {
 return (
   <html lang="en">
     <body>
       {children}
     </body>
   </html>
 );
}