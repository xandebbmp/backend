const Box = require("../models/Box");
const File = require("../models/File");

class FileController {
  async store(req, res) {
    //Consultando a box
    const box = await Box.findById(req.params.id);

    //Criar um Arquivo
    const file = await File.create({
      title: req.file.originalname,
      path: req.file.key
    });

    box.files.push(file);

    await box.save();

    //Dando Resposta em tempo Real |>|>|>|>|> WEB SOCKET

    //PEGANDO TODOS OS USUÁRIOS QUE ESTÃO CONECTADOS NAQUELA BOX COM AQUELE ID E ENVIO UMA INFORMAÇÃO DE QUE UM NOVO ARQUIVO FOI CRIADO
    req.io.sockets.in(box._id).emit("file", file);
    //Dando uma resposta pois toda uma rota precisa de uma resposta
    return res.json(file);
  }
}

module.exports = new FileController();
