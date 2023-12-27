import React from "react";
import { SearchParamsProps } from "@/types";
import { getUserAnswers } from "@/lib/actions/user.action";
import AnswerCard from "../cards/AnswerCard";
import Pagination from "./Pagination";

interface QuestionTabProps extends SearchParamsProps {
  userId: string;
  clerkId?: string | null;
}

const AnswerTab = async ({
  searchParams,
  userId,
  clerkId,
}: QuestionTabProps) => {
  const result = await getUserAnswers({
    userId,
    page: searchParams.page ? +searchParams.page : 1,
  });
  return (
    <>
      {result.answers.map((item) => (
        <AnswerCard
          key={item._id}
          clerkId={clerkId}
          _id={item._id}
          question={item.question}
          author={item.author}
          upvotes={item.upvotes}
          createdAt={item.createdAt}
        />
      ))}

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNextAnswer}
        />
      </div>
    </>
  );
};

export default AnswerTab;
