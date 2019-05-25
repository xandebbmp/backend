const express = require("express");
const multer = require("multer");
const multerConfig = require("./config/multer");

const routes = express.Router();

const BoxController = require("./controllers/BoxController");
const FileController = require("./controllers/FileController");

/*
  GET    = BUSCAR ALGUMA INFORMAÇÃO
  POST   = CRIAR ALGUMA COISA
  PUT    = EDITAR 
  DELETE = DELETE
*/

//ROTAS DO BOXES 
routes.post("/boxes", BoxController.store);
routes.get("/boxes/:id", BoxController.show);

//ROTAS DO FILES
routes.post("/boxes/:id/files", multer(multerConfig).single('file'), FileController.store);

module.exports = routes;
