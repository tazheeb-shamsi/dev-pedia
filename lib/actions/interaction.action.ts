"use server";

import Question from "@/database/question.model";
import { connectToDatabase } from "../mongoose";
import { ViewQuestionParams } from "./shared.types";
import Interaction from "@/database/interaction.model";

export const viewQuestion = async (params: ViewQuestionParams) => {
  try {
    await connectToDatabase();

    const { questionId, userId } = params;
    // Update view count for the question
    await Question.findByIdAndUpdate(questionId, { $inc: { views: 1 } });

    if (userId) {
      const isInteractionExists = await Interaction.findOne({
        user: userId,
        question: questionId,
        action: "view",
      });

      if (isInteractionExists) return;

      await Interaction.create({
        user: userId,
        question: questionId,
        action: "view",
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};
