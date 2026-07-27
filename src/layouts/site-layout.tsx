import React from "react";
import Header from "./header";

const SiteLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="bg-green-700 shrink-0 py-3 px-4 xl:px-0">
        <Header />
      </header>
      <main className="grow overflow-y-auto my-5 px-4 xl:px-0">{children}</main>
    </div>
  );
};

export default SiteLayout;
