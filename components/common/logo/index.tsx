import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = ({ showText = false, isAdmin = false }: { showText?: boolean; isAdmin?: boolean }) => {
  return (
    <Link href={isAdmin ? "/dashboard" : "/"} className="flex items-center gap-2">
      <Image src="/images/logo.png" width={40} height={40} alt="Logo" />
      {showText && <div className="font-black text-2xl">FastFeast</div>}
    </Link>
  );
};

export default Logo;
