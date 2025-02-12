import { exec } from "node:child_process";
export async function runCommand(command: string): Promise<string> {
  try {
    const { stdout, stderr } = await new Promise<{
      stdout: string;
      stderr: string | null;
    }>((resolve, reject) => {
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve({ stdout, stderr });
      });
    });

    if (stderr) {
      console.error("Command errors:", stderr);
    }

    return stdout.toString();
  } catch (error) {
    console.error("Error running command:", error);
    throw error; // Re-throw for further handling if needed
  }
}
