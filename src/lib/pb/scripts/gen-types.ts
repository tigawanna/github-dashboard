import { runCommand } from "@/utils/fs";
import { config as dotenvConfig } from "dotenv";
dotenvConfig();

// const PB_TYPES_DIR = "./src/lib/pb/"
const PB_TYPES_DIR = "./src/lib/pb"
const filter_collection=""
export async function callCliDirectly() {
  const url = process.env.VITE_PB_URL;
  const email = process.env.PB_ADMIN_EMAIL;
  const password = process.env.PB_ADMIN_PASSWORD;
  if (!url || !email || !password) {
    throw new Error(
      "Missing required environment variables: PB_URL, PB_EMAIL, PB_PASSWORD",
    );
  }
  const commands = [
    "npx",
    "@tigawanna/typed-pocketbase",
    "--email",
    email,
    "--password",
    password
  ];
  if (url && url.length > 0) {
    commands.push("--url", url);
  }
  if(PB_TYPES_DIR && PB_TYPES_DIR.length>0){
    commands.push("--dir", PB_TYPES_DIR);
  }
  if(filter_collection ){
    commands.push("--filter", filter_collection);
  }
  const output = await runCommand(commands.join(" "));
  return output;
}

callCliDirectly()
  .then((output) => {
    console.log("=== output ===",output);
  })
  .catch((error) => {
    console.error(error);
  });

