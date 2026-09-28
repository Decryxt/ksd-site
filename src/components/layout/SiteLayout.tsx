import React from "react";
import TopBar from "./TopBar/TopBar";
import StudioSignup from "./StudioSignup";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <TopBar />

      {/* Main content */}
      <main className="flex-1 pt-16">
        {children}
      </main>

      {/* Studio Signup */}
      <StudioSignup />

      {/* Footer */}
      <Footer />
    </div>
  );
}