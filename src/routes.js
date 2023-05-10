import express from "express";
import csvController from "./csvController.js";

const router = express.Router();

router.get("/file/:CSVname", csvController.getFileCSV);

export default router;
