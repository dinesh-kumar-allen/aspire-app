import './globals.css';
import Sidebar from '../components/Sidebar';
import BottomTabs from '../components/BottomTabs';
import { Open_Sans } from "next/font/google"

const openSans = Open_Sans({
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${openSans.className} antialiased`}>
      <body>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="flex-1 bg-white pb-16 lg:pb-0">
              {children}
            </div>
          </div>
          <BottomTabs />
      </body>
    </html>
  );
}
