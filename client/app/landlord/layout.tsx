import Footer from "@/components/Footer";
import LandlordNavbar from "@/components/Navbars/LandLordNavbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Landlord | Home",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <LandlordNavbar />
      {children}
      <Footer />
    </div>
  );
}
