import QuestionCard from "@/components/cards/QuestionCard";
import Pagination from "@/components/shared/Pagination";
import ResultNotFound from "@/components/shared/ResultNotFound";
import LocalSearch from "@/components/shared/searchbar/LocalSearch";
import { Button } from "@/components/ui/button";
import { getQuestionByTagId } from "@/lib/actions/tag.action";
import { URLProps } from "@/types";
import Link from "next/link";
import React from "react";

const page = async ({ params, searchParams }: URLProps) => {
  const result = await getQuestionByTagId({
    tagId: params.id,
    page: searchParams.page ? +searchParams.page : 1,
    searchQuery: searchParams.q,
  });

  return (
    <>
      <div className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center ">
        <h1 className="h1-bold text-dark200_light900 capitalize">
          {result.tagTitle}
        </h1>

        <Link href="/ask-question" className="flex justify-end max-sm:w-full">
          <Button className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900">
            Ask Question
          </Button>
        </Link>
      </div>

      <div className="mt-11 w-full">
        <LocalSearch
          route={`/tags/${params.id}`}
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search tag question..."
          otherClasses="flex-1"
        />
      </div>

      <div className="mt-10 flex w-full flex-col gap-6">
        {result.questions.length > 0 ? (
          result.questions.map((question: any) => (
            <QuestionCard
              key={question._id}
              _id={question._id}
              title={question.title}
              tags={question.tags}
              author={question.author}
              upvotes={question.upvotes}
              views={question.views}
              answers={question.answers}
              createdAt={question.createdAt}
            />
          ))
        ) : (
          <ResultNotFound
            title="There's no tag question(s) to show"
            description="Be the first to break the silence! 🚀 Ask a Question and kisckstart the discussion. Our querry could be the next big thing others learn from.         Get invloved! 💡"
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </div>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default page;
