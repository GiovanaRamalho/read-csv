const otherServices = {
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
