
import "@/styles/globals.css";
import { poppins } from "@/styles/fonts";
import SideNav from '@/components/layouts/Sidenav';

// export const metadata = Metadata(
//   title: "SVG Path Generator",
//   description: "SVG Path Generator - A NextJS app generated by 'create-next-app' which uses 'Vercel-postgre' and was built by Nathan John ( NJTD )",
// );

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex h-full flex-col md:flex-row md:overflow-hidden">
          <div className="w-full flex-none md:w-64">
            <SideNav />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
            <div>{children}</div>
          </div>
        </div>
      </body>
    </html>
  );
}
