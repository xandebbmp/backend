const multer = require("multer");
const path = require("path");
const crypto = require("crypto");

module.exports = {
  dest: path.resolve(__dirname, "..", "..", "tmp"), // ONDE VOU JOGAR MEUS ARQUIVOS QUANDO FIZER O UPLOAD NO MULTER
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "tmp"));
    },
    filename: (req, file, cb) => {
      crypto.randomBytes(16, (err, hash) => {
        //crypto => Biblioteca nativa do node que gera um conjunto de caracteres unicos (qtd de bits que seram gerados (string,caracteres especiais, numeros...tudo misturado), callback dizendo se deu error)
        if (err) cb(err);
        file.key = `${hash.toString("hex")}-${file.originalname}`; //CONTEM O HASH concatenando com um - e o nome original do arquivo
        // EX: 4gf16sdf16df-teste.jpg

        cb(null, file.key);
      });
    }
  })
};
