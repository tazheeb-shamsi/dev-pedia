import React from "react";
import Link from "next/link";
import { Badge } from "../ui/badge";

interface Props {
  _id: string;
  name: string;
  totalQuestions?: number;
  showCount?: boolean;
}

const RenderTags = ({ _id, name, totalQuestions, showCount }: Props) => {
  return (
    <Link href={`/tags/${_id}`} className="flex justify-between gap-2">
      <Badge
        variant="outline"
        className="subtle-regular background-light700_dark800 text-light400_light500 rounded-md border-none px-4 py-2"
      >
        {name.toLowerCase()}
      </Badge>
      {showCount && (
        <Badge
          variant="outline"
          className="small-medium text-dark500_light700 rounded-md"
        >
          {totalQuestions}
        </Badge>
      )}
    </Link>
  );
};

export default RenderTags;
