"use server";

import { connectToDatabase } from "../mongoose";
import { SearchParams } from "./shared.types";
import Question from "@/database/question.model";
import Answer from "@/database/answer.model";
import User from "@/database/user.model";
import Tag from "@/database/tag.model";

const SearchableTypes = ["question", "answer", "user", "type"];

export async function globalSearch(params: SearchParams) {
  try {
    connectToDatabase();
    const { query, type } = params;
    const regexQuery = { $regex: query, $options: "i" };

    let results = [];

    const modalAndTypes = [
      { model: Question, searchField: "title", type: "question" },
      { model: User, searchField: "name", type: "user" },
      { model: Answer, searchField: "content", type: "answer" },
      { model: Tag, searchField: "name", type: "tag" },
    ];

    const typeToLowerCase = type?.toLowerCase();

    if (!typeToLowerCase || !SearchableTypes.includes(typeToLowerCase)) {
      // Search accross everything

      for (const { model, searchField, type } of modalAndTypes) {
        const queryResult = await model
          .find({ [searchField]: regexQuery })
          .limit(2);

        results.push(
          ...queryResult.map((item) => ({
            title:
              type === "answer"
                ? `Answers containing ${query}`
                : item[searchField],
            type,
            id:
              type === "user"
                ? item.clerkId
                : type === "answser"
                  ? item.question
                  : item._id,
          }))
        );
      }
    } else {
      // search in specified model type
      const modelInfo = modalAndTypes.find((item) => item.type === type);
      if (!modelInfo) {
        throw new Error("Invalid search type");
      }
      const queryResult = await modelInfo.model
        .find({
          [modelInfo.searchField]: regexQuery,
        })
        .limit(8);

      results = queryResult.map((item) => ({
        title:
          type === "answer"
            ? `Answers containing ${query}`
            : item[modelInfo.searchField],
        type,
        id:
          type === "user"
            ? item.clerkId
            : type === "answser"
              ? item.question
              : item._id,
      }));
    }

    return JSON.stringify(results);
  } catch (error) {
    console.log("Error occurred while fetching global result", error);
    throw error;
  }
}
