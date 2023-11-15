import express from "express";

import { postInteraction } from "../routers/interaction/post.js";
import { getInteractionQuery, getInteraction } from "../routers/interaction/get.js";
import { patchInteractionQuery, patchInteraction } from "./interaction/patch.js";
import { deleteInteractionQuery, deleteInteraction } from "./interaction/delete.js";

export const interactionRouter = express.Router();

interactionRouter.post("/interactions", postInteraction)
interactionRouter.get("/interactions", getInteractionQuery)
interactionRouter.get("/interactions/:interaction_id", getInteraction)
interactionRouter.patch("/interactions", patchInteractionQuery)
interactionRouter.patch("/interactions/:interaction_id", patchInteraction)
interactionRouter.delete("/interactions", deleteInteractionQuery)
interactionRouter.delete("/interactions/:interaction_id", deleteInteraction)