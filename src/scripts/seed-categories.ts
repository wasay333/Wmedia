import { db } from "@/db";
import { categories } from "@/db/schema";

//  todo: create a script to seed categories
export const categoryNames = [
  "Car and vehicles",
  "Comedy",
  "Eduction",
  "Gaming",
  "Entertainment",
  "Film and animation",
  "How-to and style",
  "Music",
  "News and politics",
  "People and blogs",
  "Pets and animals",
  "Science and technology",
  "Sports",
  "Travel and events",
];
async function main() {
  console.log("Seeding the categories...");
  try {
    const values = categoryNames.map((name) => ({
      name,
      description: `Videos related to ${name.toLowerCase()}`,
    }));
    await db.insert(categories).values(values);
    console.log("Categories seeded successfully!");
  } catch (error) {
    console.error("Error seeding categories: ", error);
  }
}
main();
