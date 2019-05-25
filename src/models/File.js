const mongoose = require("mongoose");

const File = new mongoose.Schema(
  {
    title: {
      type: String,
      require: true
    },
    path: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true,

    toObject: { virtuals: true },
    toJSON: { virtuals: true }
  }
);

//CRIANDO UM CAMPO VIRTUAL
//NAO PODE ESTAR EM AROW FUNCTION, POIS PRECISAMOS ACESSAR O this. ELE SE REFERA A INSTANCIA. AO NOSSO REGISTRO DE ARQUIVO
File.virtual('url').get(function () {
  const url = process.env.URL || 'http://localhost:3333'
  return `${url}/files/${encodeURIComponent(this.path)}`;
})

module.exports = mongoose.model("File", File);
