import express from "express";

import { postInteraction } from "../routers/interaction/post.js";
import { getInteractionQuery, getInteraction } from "../routers/interaction/get.js";
import { patchInteractionQuery, patchInteraction } from "./interaction/patch.js";
import { deleteInteractionQuery, deleteInteraction } from "./interaction/delete.js";

export const interactionRouter = express.Router();

interactionRouter.post("/api/interactions", postInteraction)
interactionRouter.get("/api/interactions", getInteractionQuery)
interactionRouter.get("/api/interactions/:interaction_id", getInteraction)
interactionRouter.patch("/api/interactions", patchInteractionQuery)
interactionRouter.patch("/api/interactions/:interaction_id", patchInteraction)
interactionRouter.delete("/api/interactions", deleteInteractionQuery)
interactionRouter.delete("/api/interactions/:interaction_id", deleteInteraction)