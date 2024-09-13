import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
    <header>
      <div>
        <Link href="/">
          <div className="flex flex-wrap justify-center md:justify-end p-2">
            <img src="/cloudflare-logo.png" className="h-24" alt="Logo" />
          </div>
        </Link>
      </div>
    </header>
  );
};

export default Header;
