
import "@/styles/globals.css";
import { poppins } from "@/styles/fonts";
import SideBar from '@/components/layouts/Sidenav';
import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import StyledComponentsRegistry from "@/lib/registry";

// export const metadata = Metadata(
//   title: "SVG Path Generator",
//   description: "SVG Path Generator - A NextJS app generated by 'create-next-app' which uses 'Vercel-postgre' and was built by Nathan John ( NJTD )",
// );

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
        rel="prefetch"
        href="/fonts/Anton-Regular.ttf"
        as="font"
        type="font/ttf"
        />
        <link
        rel="prefetch"
        href="/fonts/Geologica-Sharp-VariableFont_wght.woff2"
        as="font"
        type="font/woff2"
        />
      </head>
      <body className={`w-screen h-fit ${poppins.className}`}>
        <div className="h-fit">
        <div className="flex h-min w-full flex-col md:flex-row">
          <div className="z-10 w-full flex flex-col">
            
            {/* header, footer, sidebar */}
            <Header />
            <div className="w-screen md:w-64 md:fixed md:-top-10" >
              <SideBar />
            </div>
            
          </div>
        </div>
        <div className="pl-2">
          <StyledComponentsRegistry>
            {children}
          </StyledComponentsRegistry>
        </div>
        <div className="relative bottom-0">
          <Footer />
        </div>
        </div>
      </body>
    </html>
  );
}
