import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ThemeScwitcher from "./ThemeSwitcher";
import NavbarMobile from "./NavbarMobile";
import GlobalSearch from "../searchbar/GlobalSearch";

const Navbar = () => {
  return (
    <nav className="flex-between background-light900_dark200 fixed z-50 w-full gap-5 p-6 shadow-light-300 dark:shadow-none sm:px-12">
      <Link href="/" className=" flex items-center gap-2">
        <Image
          src="/assets/images/site-logo.svg"
          width={36}
          height={36}
          alt="site logo"
        />
        <p className="h2-bold font-spaceGrotesk text-dark-100 dark:text-light-900 max-sm:hidden">
          dev<span className="text-primary-500">Pedia</span>
        </p>
      </Link>
      <GlobalSearch />
      <div className="flex-between gap-5">
        <ThemeScwitcher />
        <SignedIn>
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "h-10 w-10 ",
              },
              variables: {
                colorPrimary: "#ff7000",
              },
            }}
          />
        </SignedIn>

        {/* Mobile Navbar for mobile devices */}
        <NavbarMobile />
      </div>
    </nav>
  );
};

export default Navbar;
