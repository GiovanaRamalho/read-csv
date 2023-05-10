import fs from "fs";
import readLine from "readline";

export default {
  readCSV: async (CSVpath) => {
    const readInterface = readLine.createInterface({
      input: fs.createReadStream(CSVpath),
    });

    const fileCSV = [];
    for await (const line of readInterface) {
      fileCSV.push(line.split(";"));
    }
    return fileCSV;
  },
};
