import fs from "fs";
import readline from "readline";

export default {
  readCSV: async (CSVpath) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(CSVpath),
    });

    const fileCSV = [];
    const headers = [];

    await new Promise((resolve, reject) => {
      readInterface.on("line", (line) => {
        const lineCSV = line.split(";");

        if (headers.length === 0) {
          headers.push(...lineCSV);
        } else {
          const obj = {};
          for (let cont = 0; cont < lineCSV.length; cont++) {
            obj[headers[cont]] = lineCSV[cont];
          }
          fileCSV.push(obj);
        }
      });

      readInterface.on("close", () => {
        resolve();
      });

      readInterface.on("error", (err) => {
        reject(err);
      });
    });

    return fileCSV;
  },
};
