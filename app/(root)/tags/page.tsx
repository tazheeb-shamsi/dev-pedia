import Filter from "@/components/shared/Filter";
import Pagination from "@/components/shared/Pagination";
import ResultNotFound from "@/components/shared/ResultNotFound";
import LocalSearch from "@/components/shared/searchbar/LocalSearch";
import { TagFilters } from "@/constants/filters";
import { getAllTags } from "@/lib/actions/tag.action";
import { SearchParamsProps } from "@/types";
import Link from "next/link";
import React from "react";


import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Tags | Dev Pedia",
  description: "Dev Pedia is a community of 1,000,000+ developers.Join us",
};

const Page = async ({ searchParams }: SearchParamsProps) => {
  const result = await getAllTags({
    searchQuery: searchParams.q,
    filter: searchParams.filter,
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <>
      <h1 className="h1-bold text-dark200_light900">Tags</h1>

      <div className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/tags "
          iconPosition="left"
          imgSrc="/assets/icons/search.svg"
          placeholder="Search for tags..."
          otherClasses="flex-1"
        />
        <Filter
          filters={TagFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
        />
      </div>

      <section className="mt-12 flex flex-wrap gap-4">
        {result.tags.length > 0 ? (
          result.tags.map((tag) => (
            <Link
              href={`/tags/${tag._id}`}
              key={tag._id}
              className="shadow-light100_darknone"
            >
              <article className="background-light800_dark300 light-border flex w-full flex-col rounded-2xl border p-7 sm:w-[260px]">
                <div className="background-light700_dark800 w-fit rounded-md px-5 py-1.5 ">
                  <p className="paragraph-semibold text-dark300_light900  rounded-md">
                    {tag.name}
                  </p>
                </div>

                <p className="small-medium text-dark400_light500 mt-3.5">
                  <span className="body-semibold primary-text-gradient mr-2.5">
                    {tag.questions.length} +
                  </span>{" "}
                  Questions
                </p>
              </article>
            </Link>
          ))
        ) : (
          <ResultNotFound
            title="There's no tags to show"
            description="It Looks like there are no tags found 💡Be the first to break the silence by asking a question with some related tags! 🚀 "
            link="/ask-question"
            linkTitle="Ask a Question"
          />
        )}
      </section>

      <div className="mt-10">
        <Pagination
          pageNumber={searchParams?.page ? +searchParams.page : 1}
          isNext={result.isNext}
        />
      </div>
    </>
  );
};

export default Page;
