import "dotenv/config";
import { and, eq, TypedPocketBase } from "@tigawanna/typed-pocketbase";
import { LocalAuthStore } from "pocketbase";
import { Schema } from "../pb-types";

async function adminPB() {
  if (!process.env.PB_ADMIN_EMAIL) {
    throw new Error("Please provide the admin email in the .env file");
  }
  if (!process.env.PB_ADMIN_PASSWORD) {
    throw new Error("Please provide the admin password in the .env file");
  }
  if (!process.env.VITE_PB_URL) {
    throw new Error("Please provide the pocketbase url in the .env file");
  }
  const PB_URL = process.env.VITE_PB_URL;
  const test_pb = new TypedPocketBase<Schema>(
    PB_URL,
    // @ts-ignore : this is throwing an error only in tsc cli but it's how docs recommend it
    new LocalAuthStore("test_token"),
  );

  await test_pb
    .from("_superusers")
    .authWithPassword(
      process.env.PB_ADMIN_EMAIL,
      process.env.PB_ADMIN_PASSWORD,
    );
  return test_pb;
}

export async function impersonateTenant(tenant: string) {
  const pb = await adminPB();
  const tenanatPB = await pb.impersonate("property_user", tenant, 2000);
  return tenanatPB;
}

// impersonateTenant("ci5k6sgft8dv462");
