import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProfileLinkProps {
  imgUrl: string;
  href?: string;
  title: string;
}

const ProfileLink = ({ imgUrl, href, title }: ProfileLinkProps) => {
  return (
    <div className="flex-center gap-1">
      <Image
        src={imgUrl}
        width={20}
        height={20}
        alt="icon"
        className="invert-colors"
      />

      {href ? (
        <Link
          href={href}
          target="_blank"
          className="paragraph-medium ml-1 text-accent-blue"
        >
          {title}
        </Link>
      ) : (
        <p className="paragraph-medium text-dark400_light700  ml-1">{title}</p>
      )}
    </div>
  );
};

export default ProfileLink;
