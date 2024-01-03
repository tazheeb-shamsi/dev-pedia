import { getTopInteractedTags } from "@/lib/actions/tag.action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Badge } from "../ui/badge";
import RenderTags from "../shared/RenderTags";

interface Props {
  user: {
    _id: string;
    clerkId: string;
    picture: string;
    name: string;
    username: string;
  };
}
const UserCard = async ({ user }: Props) => {
  const interactedTags = await getTopInteractedTags({
    userId: user._id,
  });
  return (
    <Link
      href={`/profile/${user.clerkId}`}
      className="w-full shadow-light-300 max-xs:min-w-full xs:w-[260px] dark:shadow-dark-200"
    >
      <article className=" light-border background-light800_dark300 text-dark500_light700 flex h-[17rem] w-full flex-col items-center justify-center rounded-[10px] border p-8">
        <Image
          src={user.picture}
          alt="user profile picture"
          width={100}
          height={100}
          className="h-[100px] w-[100px] rounded-full object-cover"
        />

        <div className="mt-4 text-center">
          <h3 className="h3-bold text-dark200_light900 line-clamp-1">
            {user.name}
          </h3>
          <p className="body-regular text-dark500_light500 mt-2">
            @{user.username}
          </p>
        </div>

        <div className="mt-5">
          {interactedTags.length > 0 ? (
            <div className="flex items-center gap-2">
              {interactedTags.map((tag) => (
                <RenderTags key={tag._id} _id={tag._id} name={tag.name} />
              ))}
            </div>
          ) : (
            <Badge></Badge>
          )}
        </div>
      </article>
    </Link>
  );
};

export default UserCard;
