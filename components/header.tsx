import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  return (
      <div>
        <div className="flex flex-wrap justify-center md:justify-end pr-2">
          <Link href="/">
            <img src="/cloudflare-logo.png" className="h-24" alt="Logo" />
          </Link>
        </div>
      </div>
  );
};

export default Header;
