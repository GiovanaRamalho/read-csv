import path from "path";
import fileService from "./fileService.js";

export default {
  getFileCSV: async (req, res) => {
    const { CSVname } = req.params;

    try {
      const CSVpath = path.join(
        new URL("../file", import.meta.url).pathname,
        CSVname
      );
      const fileCSV = await fileService.readCSV(CSVpath);
      res.status(200).json({ File: fileCSV });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
