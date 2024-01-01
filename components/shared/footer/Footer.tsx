import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <>
      <hr className="my-6 border-t border-gray-100 dark:border-gray-800" />

      <footer className="flex-between background-light900_dark200 z-50 w-full flex-col-reverse items-center gap-4 p-6 shadow-light-300 sm:px-12 dark:shadow-none">
        <Link href="/" className="flex items-center justify-center gap-2">
          <Image
            src="/assets/images/site-logo.svg"
            width={30}
            height={30}
            alt="site logo"
          />
          <p className="h3-bold font-spaceGrotesk  text-dark-100 dark:text-light-900">
            dev
            <span className="text-primary-500">Pedia</span>
          </p>
          <p className="text-dark-100 dark:text-light-900">© {currentYear}</p>
        </Link>

        <div className="text-dark300_light900 flex items-center gap-4">
          <Link href="/">
            <p className="hover:text-primary-500">Terms</p>
          </Link>
          <Link href="/">
            <p className="hover:text-primary-500">Privacy</p>
          </Link>
          <Link href="/">
            <p className="hover:text-primary-500">Security</p>
          </Link>
          <Link href="/">
            <p className="mr-4 hover:text-primary-500">Contact</p>
          </Link>
        </div>
      </footer>
    </>
  );
};

export default Footer;
