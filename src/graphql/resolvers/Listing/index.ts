import { ObjectID } from "mongodb";
import { IResolvers } from "apollo-server-express";
import { Database, Listing } from "../../../lib/types";

export const listingResolvers: IResolvers = {
  Query: {
    listings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<Listing[]> => {
      // throw new Error("Error from graphQL"); // to test server error
      return await db.listings.find().toArray();
    },
  },
  Mutation: {
    deleteListing: async (
      _root: undefined,
      { id }: { id: string },
      { db }: { db: Database }
    ): Promise<Listing> => {
      // throw new Error("Error from graphQL"); // to test server error
      const deleteResult = await db.listings.findOneAndDelete({
        _id: new ObjectID(id),
      });

      if (!deleteResult.value) {
        throw new Error("Failed delete listing!");
      }

      return deleteResult.value;
    },
    generateListings: async (
      _root: undefined,
      _args: {},
      { db }: { db: Database }
    ): Promise<boolean> => {
      const listings: Listing[] = [
        {
          _id: new ObjectID(),
          title:
            "Clean and fully furnished apartment. 5 min away from CN Tower",
          image:
            "https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg",
          address: "3210 Scotchmere Dr W, Toronto, ON, CA",
          price: 10000,
          numOfGuests: 2,
          numOfBeds: 1,
          numOfBaths: 2,
          rating: 5,
        },
        {
          _id: new ObjectID(),
          title: "Luxurious home with private pool",
          image:
            "https://res.cloudinary.com/tiny-house/image/upload/v1560645376/mock/Los%20Angeles/los-angeles-listing-1_aikhx7.jpg",
          address: "100 Hollywood Hills Dr, Los Angeles, California",
          price: 15000,
          numOfGuests: 2,
          numOfBeds: 1,
          numOfBaths: 1,
          rating: 4,
        },
        {
          _id: new ObjectID(),
          title:
            "Single bedroom located in the heart of downtown San Fransisco",
          image:
            "https://res.cloudinary.com/tiny-house/image/upload/v1560646219/mock/San%20Fransisco/san-fransisco-listing-1_qzntl4.jpg",
          address: "200 Sunnyside Rd, San Fransisco, California",
          price: 25000,
          numOfGuests: 3,
          numOfBeds: 2,
          numOfBaths: 2,
          rating: 3,
        },
      ];

      try {
        // throw new Error("Failed generate listings!"); // to test server error
        for (const listing of listings) {
          await db.listings.insertOne(listing);
        }

        return true;
      } catch (error) {
        console.error(error);
        throw new Error("Failed generate listings!");
      }
    },
  },
  Listing: {
    id: (listing: Listing): string => listing._id.toString(),
  },
};
