import React from "react";
import Link from "next/link";
import RenderTags from "../shared/RenderTags";
import Metric from "../shared/Metric";
import { formatBigNumber, getTimestamp } from "@/lib/utils";
import { SignedIn, auth } from "@clerk/nextjs";
import EditDeleteAction from "../shared/EditDeleteAction";

interface QuestionProps {
  _id: string;
  title: string;
  tags: {
    _id: string;
    name: string;
  }[];
  author: {
    _id: string;
    clerkId: string;
    name: string;
    picture: string;
  };
  upvotes: string[];
  views: number;
  answers: Array<object>;
  createdAt: Date;
}

const QuestionCard = ({
  _id,
  title,
  tags,
  author,
  upvotes,
  views,
  answers,
  createdAt,
}: QuestionProps) => {
  const { userId: clerkId } = auth();
  const showActionButtons = clerkId && clerkId === author.clerkId;

  return (
    <div className="light-border background-light800_dark300 text-dark500_light700 rounded-[10px] border p-9 sm:px-11 ">
      <div className="flex flex-col-reverse  items-start justify-between  gap-5 sm:flex-row">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden ">
            {getTimestamp(createdAt)}
          </span>
          <Link href={`/question/${_id}`}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>

        {/* If signedIn add edit/delete options */}
        <SignedIn>
          {showActionButtons && (
            <EditDeleteAction type="Question" itemId={JSON.stringify(_id)} />
          )}
        </SignedIn>
      </div>

      <div className="mt-3.5 flex flex-wrap gap-2">
        {tags.map((tag) => (
          <RenderTags key={tag._id} _id={tag._id} name={tag.name} />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3">
        <Metric
          imgUrl={author.picture}
          alt="User Photo"
          value={author.name}
          title={` - asked  ${getTimestamp(createdAt)}`}
          href={`/profile/${author.clerkId}`}
          isAuthor
          textStyLes="gap-1 body-medium text-dark400_light700"
        />
        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/assets/icons/like.svg"
            alt="Upvotes"
            value={`${formatBigNumber(upvotes.length)}` || 0}
            title="Votes"
            textStyLes=" body-medium text-dark400_light800"
          />

          <Metric
            imgUrl="/assets/icons/message.svg"
            alt="Message"
            value={`${formatBigNumber(answers.length)}` || 0}
            title="Answers"
            textStyLes=" body-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/assets/icons/eye.svg"
            alt="Views"
            value={`${formatBigNumber(views)}` || 0}
            title="Views"
            textStyLes=" body-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
