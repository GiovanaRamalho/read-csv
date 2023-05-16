import path from "path";
import csvService from "./csvService.js";

const { readCSV, findByName, validateData } = csvService;

export default {
  getFileCSV: async (req, res) => {
    const { CSVname } = req.params;

    try {
      const CSVpath = path.join(
        new URL("../file", import.meta.url).pathname,
        CSVname
      );

      const fileCSV = await readCSV(CSVpath);
      const line = findByName(fileCSV);
      //const validatedData = validateData(fileCSV);

      res.status(200).send(line);
    } catch (error) {
      res.status(400).send(error);
    }
  },
};
