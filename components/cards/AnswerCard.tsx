import Link from "next/link";
import React from "react";
import Metric from "../shared/Metric";
import { formatBigNumber, getTimestamp } from "@/lib/utils";
import { SignedIn } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface AnswerProps {
  clerkId?: string | null;
  _id: string;
  question: {
    _id: string;
    title: string;
  };
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  createdAt: Date;
}

const AnswerCard = ({
  clerkId,
  _id,
  question,
  author,
  upvotes,
  createdAt,
}: AnswerProps) => {
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <Link
      href={`/question/${question._id}/#${_id}`}
      className="light-border background-light800_dark300 text-dark500_light700 w-full rounded-[10px] border px-11 py-9"
    >
      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
        <div>
          <span
            className=" subtle-regular
            text-dark400_light700 line-clamp-1
            flex sm:hidden"
          >
            {getTimestamp(createdAt)}
          </span>
          <h3
            className=" sm:h3-semibold
            base-semibold text-dark200_light900
            line-clamp-1 flex-1"
          >
            {question.title}
          </h3>
        </div>

        {/* If signedIn add edit/delete options */}
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Answer" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="flex-between mt-6 flex w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="User Photo"
          value={author.name}
          title={` - asked  ${getTimestamp(createdAt)}`}
          href={`/profile/${author._id}`}
          isAuthor
          textStyLes="gap-1 body-medium text-dark400_light700"
        />
        <Metric
          imgUrl="/assets/icons/like.svg"
          alt="Upvotes"
          value={`${formatBigNumber(upvotes.length)}` || 0}
          title="Votes"
          textStyLes=" body-medium text-dark400_light800"
        />
      </div>
    </Link>
  );
};

export default AnswerCard;
