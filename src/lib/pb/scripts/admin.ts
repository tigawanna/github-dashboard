import { TypedPocketBase } from "@tigawanna/typed-pocketbase";
import { Schema } from "@/lib/pb/pb-types";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

async function cliAdminPB() {
  if (
    !process.env.PB_ADMIN_EMAIL ||
    !process.env.PB_ADMIN_PASSWORD ||
    !process.env.VITE_PB_URL
  ) {
    throw new Error(
      "Please provide the admin email and password in the .env file",
    );
  }
  const PB_URL = process.env.VITE_PB_URL;
  const pb = new TypedPocketBase<Schema>(PB_URL);

  await pb.from("_superusers").authWithPassword(
    process.env.PB_ADMIN_EMAIL,
    process.env.PB_ADMIN_PASSWORD,
  );
  return pb;
}




