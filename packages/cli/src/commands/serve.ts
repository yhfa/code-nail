import path from "path";
import { Command } from "commander";
import { serve } from "local-api";

interface ILocalApiError {
  code: string;
}

const isProduction = process.env.NODE_ENV === "production";

export const serveCommand = new Command()
  .command("serve [filename]")
  .description("Open a file for editing")
  .option("-p, --port <number>", "port to run server on", "4005")
  .action(async (filename = "notebook.js", options: { port: string }) => {
    try {
      const dir = path.join(process.cwd(), path.dirname(filename));
      await serve(
        Number(options.port),
        path.basename(filename),
        dir,
        !isProduction
      );

      console.log(`
      Opened ${filename} file. Navigate tp http://localhost:${options.port} to edit the file.
      `);
    } catch (error) {
      const isLocalApiError = (error: any): error is ILocalApiError => {
        return typeof error.code === "string";
      };

      if (isLocalApiError(error)) {
        if (error.code === "EADDRINUSE") {
          console.error("Port is in use. Try running on a different port.");
        }
      } else if (error instanceof Error) {
        console.log("Heres the problem", error.message);
      }
      process.exit(1);
    }
  });
