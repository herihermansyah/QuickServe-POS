import React from "react";
import Header from "./header";

const SiteLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="bg-green-900 shrink-0 py-3 px-4 xl:px-0 shadow-dropdown">
        <Header />
      </header>
      <main className="grow my-5 px-4 overflow-hidden xl:px-0">{children}</main>
    </div>
  );
};

export default SiteLayout;
