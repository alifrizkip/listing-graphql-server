import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

const dbName = "test";

const url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_USER_PASSWORD}@${process.env.DB_HOST}/${dbName}?retryWrites=true&w=majority`;

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url);
  const db = client.db(dbName);

  return {
    listings: db.collection("test_listings"),
  };
};
