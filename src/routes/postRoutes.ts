import { Router } from "express";

const postRoutes = Router();

postRoutes.post("/create");

postRoutes.get("/all");

postRoutes.get("/my");

postRoutes.get("/:id");

postRoutes.put("/update");

postRoutes.delete("/delete");

export default postRoutes;
