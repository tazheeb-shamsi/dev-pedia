import AnswerForm from "@/components/forms/AnswerForm";
import Metric from "@/components/shared/Metric";
import ParseEditorHTML from "@/components/shared/ParseEditorHTML";
import RenderTags from "@/components/shared/RenderTags";
import { getQuestionById } from "@/lib/actions/question.action";
import { formatBigNumber, getTimestamp } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import { auth } from "@clerk/nextjs";
import { getUserById } from "@/lib/actions/user.action";
import AllAnswers from "@/components/shared/AllAnswers";
import Votes from "@/components/shared/Votes";

const Page = async ({ params, searchParams }: any) => {
  const result = await getQuestionById({ questionId: params.id });

  const { userId: clerkId } = auth();
  let user;
  if (clerkId) {
    user = await getUserById({ userId: clerkId });
  }

  return (
    <>
      <div className="flex-start w-full flex-col">
        <div className="flex w-full flex-col-reverse justify-between gap-5 sm:flex-row sm:items-center sm:gap-2">
          <Link
            href={`/profile/${result.author.clerkId}`}
            className=" flex items-center justify-start gap-1"
          >
            <Image
              src={result.author.picture}
              alt="profile-pic"
              className="rounded-full"
              width={22}
              height={22}
            />
            <p className="paragraph-semibold text-dark300_light700">
              {result.author.name}
            </p>
          </Link>

          <div className="flex justify-end">
            <Votes
              type="question"
              itemId={JSON.stringify(result._id)}
              userId={JSON.stringify(user?._id)}
              upvotes={result.upvotes.length}
              downvotes={result.downvotes.length}
              hasupVoted={result.upvotes.includes(user?._id)}
              hasdownVoted={result.downvotes.includes(user?._id)}
              hasSaved={user?.saved.includes(result?._id)}
            />
          </div>
        </div>

        <h2 className="h2-semibold text-dark200_light900 mt-3.5 w-full text-left">
          {result.title}
        </h2>
      </div>
      <div className="mb-8 mt-5 flex w-full flex-wrap  gap-4">
        <Metric
          imgUrl="/assets/icons/clock.svg"
          alt="clock icon"
          value={getTimestamp(result.createdAt)}
          title=""
          textStyLes=" small-medium text-dark400_light800"
        />

        <Metric
          imgUrl="/assets/icons/message.svg"
          alt="Message"
          value={`${formatBigNumber(result.answers.length)}` || 0}
          title="Answers"
          textStyLes=" small-medium text-dark400_light800"
        />
        <Metric
          imgUrl="/assets/icons/eye.svg"
          alt="Views"
          value={`${formatBigNumber(result.views)}`}
          title="Views"
          textStyLes=" body-medium text-dark400_light800"
        />
      </div>

      {/* converting editor's HTML format input data into code block */}
      <ParseEditorHTML data={result.content} />

      <div className="mt-5 flex flex-wrap gap-4">
        {result.tags.map((tag: any) => (
          <RenderTags
            key={tag._id}
            _id={tag._id}
            name={tag.name}
            showCount={false}
          />
        ))}
      </div>

      <AllAnswers
        questionId={result._id}
        userId={user?._id}
        totalAnswers={result.answers.length}
        page={searchParams?.page}
        filter={searchParams?.filter}
      />
      <AnswerForm
        question={result.content}
        userId={user?._id}
        questionId={JSON.stringify(result._id)}
        authorId={JSON.stringify(user?._id)}
      />
    </>
  );
};

export default Page;
