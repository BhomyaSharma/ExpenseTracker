import "./style/globals.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { Toaster } from 'react-hot-toast';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white h-screen">
        <div className="flex h-screen">
          <Sidebar />

          <div className="flex-1 flex flex-col overflow-auto">
            <Navbar />
            <main className="p-8">{children}</main>
          </div>
        </div>

        {/* Add Toaster here so it's globally accessible */}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
