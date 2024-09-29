import React from "react";
import Logo from "../common/logo";
import SearchOrder from "../user/search-order";
import Cart from "../user/cart";

const UserLayout = () => {
  return (
    <div className="max-w-screen-lg mx-auto flex justify-between items-center h-16 px-2">
      <Logo showText={true} />
      <div className="flex gap-2">
        <SearchOrder />
        <Cart />
      </div>
    </div>
  );
};

export default UserLayout;
