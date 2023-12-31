import Image from "next/image";
import Link from "next/link";
import React from "react";

interface MetricProps {
  imgUrl: string;
  alt: string;
  value: string | number;
  title: string;
  href?: string;
  textStyLes?: string;
  isAuthor?: boolean;
}

const Metric = ({
  imgUrl,
  alt,
  value,
  href,
  title,
  isAuthor,
  textStyLes,
}: MetricProps) => {
  const metricContent = (
    <div className="flex flex-row gap-1">
      <Image
        src={imgUrl}
        alt={alt}
        width={16}
        height={16}
        className={` object-contain ${href ? " rounded-full " : ""} mr-1`}
      />
      <p className={` ${textStyLes} flex items-center gap-1`}>
        {value}
        <span
          className={`small-regular line-clamp-1 ${
            isAuthor ? "max-sm:hidden" : ""
          }`}
        >
          {title}
        </span>
      </p>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="flex-center  gap-1">
        {metricContent}
      </Link>
    );
  }
  return <div className="flex-center flex-wrap gap-1">{metricContent}</div>;
};

export default Metric;
