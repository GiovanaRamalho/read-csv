import path from "path";
import csvService from "./csvService.js";

export default {
  getFileCSV: async (req, res) => {
    const { CSVname } = req.params;

    try {
      const CSVpath = path.join(
        new URL("../file", import.meta.url).pathname,
        CSVname
      );
      const fileCSV = await csvService.readCSV(CSVpath);
      res.status(200).json({ File: fileCSV });
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
