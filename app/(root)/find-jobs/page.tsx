import Image from "next/image";
import React from "react";

import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Find-Jobs | Dev Pedia",
  description: "Dev Pedia is a community of 1,000,000+ developers.Join us",
};

const page = () => {
  return (
    <div className=" mx-auto max-w-[960px] ">
      <div className=" flex flex-col-reverse items-center text-center ">
        <div className="mt-10">
          <h1 className="text-dark200_light900 text-3xl font-semibold">
            Work in Progress
          </h1>
          <p className="mt-4 text-gray-600">
            This page is under construction. Check back soon!
          </p>
        </div>
        <Image
          src="/assets/wip.gif"
          alt="Under Construction"
          width={400}
          height={300}
          className="mt-8 items-center rounded-full"
        />
      </div>
    </div>
  );
};

export default page;
