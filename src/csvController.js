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

      res.status(200).send(fileCSV);
    } catch (error) {
      res.status(400).send(error);
    }
  },

  insertCSVLine: async (req, res) => {
    const lineData = req.body;
    console.log(lineData);

    try {
      await csvService.insertData(lineData);

      res.status(200).send("Line inserted successfully.");
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
