import mongoose from "mongoose";

let isConnected: boolean = false;

const DATABASE_URL = process.env.MONGODB_URL;

export const connectToDatabase = async () => {
  if (!DATABASE_URL) {
    return console.log("Missing MONGODB_URL");
  }

  if (isConnected) {
    return;
  }

  try {
    // Seting strict mode
    mongoose.set("strictQuery", true);
    await mongoose.connect(DATABASE_URL, {
      dbName: "DevPedia",
    });

    isConnected = true;
    if (isConnected === true) {
      console.log("Mongodb connected successfully");
    }
  } catch (error) {
    console.log("Error while connecting to MongoDB", error);
    throw error;
  }
};
