const HttpStatus = require("http");
const fs = require("fs")
const multer = require("multer");
const path = require("path");
const rootPath = "public/image";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, rootPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

module.exports.upload = upload.single("image");

module.exports.uploadImage = (request, response, next) => {
  try {
    response.json({ status: 200, mensaje: "Imagen subida" });
  } catch (e) {
    response.json({ status: 500, mensaje: "Error al subir imagen" });
  }
};

module.exports.getImage = async (request, response, next) => {
  try {

    const filename = request.body.filename;
    const split = filename.split(".");
    const content_type = split[split.length - 1];

    const filePath = path.resolve(
      __dirname,
      `../public/image/${filename}`
    );

    var inicio = `data:image/${content_type};base64, `;
    
    let base64 = fs.readFileSync(filePath, {encoding: 'base64'});

    response.json({status: 200, base64: `${inicio}${base64}`});;

  } catch (error) {
    response.json({ status: 500, mensaje: "Error del servidor" + error });
  }
};
