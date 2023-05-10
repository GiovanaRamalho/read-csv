import express from "express";
import fileController from "./fileController.js";

const router = express.Router();

router.get("/file/:CSVname", fileController.getFileCSV);

export default router;
