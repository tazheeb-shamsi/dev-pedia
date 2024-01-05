import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <div className="flex flex-col-reverse items-start justify-between sm:flex-row">
        <div className="flex flex-col items-start gap-4 lg:flex-row">
          <Skeleton className="h-[140px] w-[140px] rounded-full" />
          <div>
            <Skeleton className="mb-2 h-6 w-40" />
            <Skeleton className="h-4 w-28" />
            <div className="mt-3 flex flex-wrap items-center justify-start gap-5">
              <Skeleton className="h-7 w-36" />
              <Skeleton className="h-7 w-24" />
              <Skeleton className="h-7 w-28" />
            </div>
            <Skeleton className="mt-2 h-6 w-full" />
          </div>
        </div>

        <div className="flex justify-end max-sm:mb-5 max-sm:w-full sm:mt-3">
          <Skeleton className="btn-secondary min-h-[46px] min-w-[175px] rounded-md px-4 py-3" />
        </div>
      </div>

      <div className="mt-10 flex  justify-between">
        <div>
          <Skeleton className="h-11 w-32 " />
        </div>
        <div>
          <Skeleton className="h-11 w-48" />
        </div>
      </div>
      {/* </div>
      </div> */}

      <div className="mt-5 grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-4">
        <Skeleton className="h-32 rounded-md" />
        <Skeleton className="h-32 rounded-md" />
        <Skeleton className="h-32 rounded-md" />
        <Skeleton className="h-32 rounded-md" />
      </div>

      <div className="mt-10 flex gap-10">
        <div className="flex flex-1 flex-col">
          <div className="flex">
            <Skeleton className="h-11 w-24 rounded-r-none" />
            <Skeleton className="h-11 w-24 rounded-l-none" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
