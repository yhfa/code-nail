import fs from "fs/promises";
import path from "path";
import express from "express";

type CellType = "code" | "text";

interface Cell {
  id: string;
  type: CellType;
  content: string;
}

interface ILocalApiError {
  code: string;
}

export const createCellsRouter = (filename: string, dir: string) => {
  const cellsRouter = express.Router();
  cellsRouter.use(express.json());

  const fullPath = path.join(dir, filename);

  cellsRouter
    .route("/cells")
    .get(async (req, res) => {
      try {
        const result = await fs.readFile(fullPath, "utf-8");
        res
          .status(200)
          .json({ status: "succuss", data: { cells: JSON.parse(result) } });
      } catch (error) {
        const isLocalApiError = (error: any): error is ILocalApiError => {
          return typeof error.code === "string";
        };

        if (isLocalApiError(error)) {
          if (error.code === "ENOENT") {
            await fs.writeFile(fullPath, "[]", "utf-8");
            res.status(200).json({ status: "succuss", data: { cells: [] } });
          } else {
            res
              .status(404)
              .json({ status: "error", message: "Some thing went wrong." });
          }
        }
      }
    })
    .post(async (req, res) => {
      const { cells }: { cells: Cell[] } = req.body;
      await fs.writeFile(fullPath, JSON.stringify(cells), "utf-8");

      res.status(201).json({ status: "succuss" });
    });

  return cellsRouter;
};
