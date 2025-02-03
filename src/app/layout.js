
import "./globals.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThemeProvider } from 'next-themes';


export const metadata = {
  title: "TeamSync | Seamless Team Collaboration",
  description: "TeamSync is a platform that empowers teams to collaborate, communicate, and manage projects efficiently, all in one place.",
  keywords: "team collaboration, project management, communication, remote work, team productivity",
  author: "TeamSync",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ToastContainer position="top-right" autoClose={3000} />
        <ThemeProvider attribute="class">{children}</ThemeProvider>
      </body>
    </html>
  );
}
