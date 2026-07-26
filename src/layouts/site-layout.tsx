import React from "react";

const SiteLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <header className="bg-green-700 py-5 shrink-0 px-4 xl:px-0">
        header
      </header>
      <main className="grow overflow-hidden my-5 px-4 xl:px-0">{children}</main>
      <footer className="bg-green-300 py-1 shrink-0 px-4 xl:px-0">
        footer
      </footer>
    </div>
  );
};

export default SiteLayout;
