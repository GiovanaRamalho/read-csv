import fs from "fs";
import readline from "readline";

export default {
  readCSV: async (CSVpath) => {
    const readInterface = readline.createInterface({
      input: fs.createReadStream(CSVpath, { encoding: "utf-8" }),
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

  formatData: (lineData) => {
    const keys = Object.keys(lineData);
    const values = Object.values(lineData);
    const fileContent = `${keys.join(";")}\n${values.join(";")}`;

    return fileContent;
  },

  insertData: async (lineData) => {
    const filePath = "./file/dados_quatro.csv";

    const newLine = Object.values(lineData).join(";");

    if (fs.existsSync(filePath)) {
      const csvContent = fs.readFileSync(filePath, "utf-8");

      if (csvContent.length === 0) {
        const datas = formatData(lineData);

        fs.writeFileSync(filePath, datas);
      } else {
        fs.appendFileSync(filePath, `\n${newLine}`, { flag: "a" });
      }
    } else {
      const datas = formatData(lineData);

      fs.writeFileSync(filePath, datas);
    }
  },
};
