import fs from "fs";
import readline from "readline";

export default {
  readCSV: (CSVpath) => {
    return new Promise((resolve, reject) => {
      const readInterface = readline.createInterface({
        input: fs.createReadStream(CSVpath),
      });

      const fileCSV = [];

      readInterface
        .on("line", (line) => {
          fileCSV.push(line.split(";"));
        })
        .on("close", () => {
          resolve(fileCSV);
        })
        .on("error", (err) => {
          reject(err);
        });
    });
  },

  transforArrayInObejct: async () => {},
};
