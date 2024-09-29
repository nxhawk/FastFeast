import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "../common/logo";

const UserFooter = () => {
  return (
    <div className="border-t py-4 flex flex-col justify-center items-center gap-3">
      <Logo showText={true} />
      <div className="text-red-500 font-bold">Chưa mở cửa</div>
      <div> 227 Đ. Nguyễn Văn Cừ, Phường 4, Quận 5, Hồ Chí Minh</div>
      <div className="flex items-center gap-5">
        <Link href="/">
          <Image src="/images/youtube.png" alt="youtube" width={40} height={40} />
        </Link>
        <Link href="/">
          <Image src="/images/facebook.png" alt="facebook" width={40} height={40} />
        </Link>
        <Link href="/">
          <Image src="/images/gmail.png" alt="gmail" width={40} height={40} />
        </Link>
      </div>
      <div className="mt-2 text-sm">
        Copyright © 2024 Site by{" "}
        <a
          href="
    https://github.com/nxhawk"
          target="_blank"
          className="text-blue-700 underline"
        >
          @nxhawk
        </a>
      </div>
    </div>
  );
};

export default UserFooter;
