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

  validateData: (fileCSV) => {
    const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
    const regexCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/;
    const regexContaCorrente = /^\d{3}-\d$/;

    return fileCSV.map((obj) => ({
      ...obj,
      CPF: regexCPF.test(obj.CPF)
        ? "preenchido corretamente"
        : "preenchido incorretamente",
      CNPJ: regexCNPJ.test(obj.CNPJ)
        ? "preenchido corretamente"
        : "preenchido incorretamente",
      "Conta corrente": regexContaCorrente.test(obj["Conta corrente"])
        ? "preenchido corretamente"
        : "preenchido incorretamente",
    }));
  },

  findByName: (fileCSV) => {
    const objCSV = fileCSV;
    const name = "Giovana";

    const result = objCSV.find(
      (obj) => obj.Nome.toLowerCase() === name.toLowerCase()
    );
    return result || null;
  },
};
