import React from "react";
import TopBar from "./TopBar/TopBar";

type Props = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-white text-black">
      <TopBar />
      {/* Fixed header height offset */}
      <div className="pt-16">{children}</div>
    </div>
  );
}