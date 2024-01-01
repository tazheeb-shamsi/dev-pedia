"use server";

import User from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import {
  GetAllTagsParams,
  GetQuestionsByTagIdParams,
  GetTopInteractedTagsParams,
} from "./shared.types";
import Tag, { ITag } from "@/database/tag.model";
import { FilterQuery, Schema } from "mongoose";
import Question from "@/database/question.model";

export async function getAllTags(params: GetAllTagsParams) {
  try {
    connectToDatabase();
    const { searchQuery, filter, page = 1, pageSize = 10 } = params;
    const skipAmount = (page - 1) * pageSize;
    const query: FilterQuery<typeof Tag> = {};

    if (searchQuery) {
      query.$or = [{ name: { $regex: new RegExp(searchQuery, "i") } }];
    }

    let sortOptions = {};
    switch (filter) {
      case "popular":
        sortOptions = { questions: -1 };
        break;
      case "recent":
        sortOptions = { createdAt: 1 };
        break;
      case "name":
        sortOptions = { name: 1 };
        break;
      case "old":
        sortOptions = { createdAt: 1 };
        break;

      default:
        break;
    }
    const totalTagss = await Tag.countDocuments(query);

    const tags = await Tag.find(query)
      .sort(sortOptions)
      .skip(skipAmount)
      .limit(pageSize);

    const isNext = totalTagss > skipAmount + tags.length;

    return { tags, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
//   try {
//     connectToDatabase();

//     const { userId } = params;
//     const user = await User.findById(userId);

//     if (!user) {
//       throw new Error(`User ${userId} not found`);
//     }

//     // Find interaction of User and group by Tags
//     // Interactioins...
//     return [
//       { _id: "1", name: "tag1" },
//       { _id: "2", name: "tag2" },
//       { _id: "3", name: "tag3" },
//     ];
//   } catch (error) {
//     console.log(error);
//     throw error;
//   }
// }

export async function getTopInteractedTags(params: GetTopInteractedTagsParams) {
  try {
    connectToDatabase();

    const { userId } = params;

    // Find interactions of the user
    const userQuestions = await Question.find({
      author: userId,
    }).populate("tags");

    // Extract tag ids from interactions and flatten the array
    const tagIds: Schema.Types.ObjectId[] = userQuestions.flatMap((question) =>
      question.tags.map((tag: any) => tag._id)
    );

    // Count the occurrences of each tag id globally for the user
    const tagCountMap: Record<string, number> = tagIds.reduce(
      (countMap, id) => {
        if (id) {
          const stringId = id.toString();
          // @ts-ignore
          countMap[stringId] = (countMap[stringId] || 0) + 1;
        }
        return countMap;
      },
      {}
    );
    // Sort the tag ids by count in descending order
    const sortedTagIds = Object.keys(tagCountMap).sort(
      (a, b) => tagCountMap[b] - tagCountMap[a]
    );
    // Slice to get the top 2 tag ids
    const topTagIds = sortedTagIds.slice(0, 2);

    // Query the Tag model to get tag details
    const topTags = await Tag.find({ _id: { $in: topTagIds } });

    return topTags;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getQuestionByTagId(params: GetQuestionsByTagIdParams) {
  try {
    connectToDatabase();

    const { tagId, page = 1, pageSize = 10, searchQuery } = params;
    const skipAmount = (page - 1) * pageSize;

    const tagFilter: FilterQuery<ITag> = { _id: tagId };

    const tag = await Tag.findOne(tagFilter).populate({
      path: "questions",
      model: Question,
      match: searchQuery
        ? { title: { $regex: searchQuery, $options: "i" } }
        : {},
      options: {
        sort: { createdAt: -1 },
        skip: skipAmount,
        limit: pageSize + 1,
      },
      populate: [
        { path: "tags", model: Tag, select: "_id name" },
        { path: "author", model: User, select: "_id clerkId name picture" },
      ],
    });

    if (!tag) {
      throw new Error("Tag not found");
    }

    const isNext = tag.questions.length > pageSize;

    const questions = tag.questions;
    return { tagTitle: tag.name, questions, isNext };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getPopularTags() {
  try {
    connectToDatabase();
    const popularTags = await Tag.aggregate([
      { $project: { name: 1, numberOfQuestions: { $size: "$questions" } } },
      { $sort: { numberOfQuestions: -1 } },
      { $limit: 5 },
    ]);

    return popularTags;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
