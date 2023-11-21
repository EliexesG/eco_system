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

    // const { Name,Ext } = req.body;
    const { fileName } = request.body;
    const split = fileName.split(".");
    const content_type = split[split.length - 1];

    const filePath = path.resolve(
      __dirname,
      `../public/image/${fileName}`
    );
    var inicio = `data:image/${content_type};base64, `;

    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        response.StatusCode = HttpStatus.NOT_FOUND;
        response.Message = "Archivo no encontrado";
        return response.status(HttpStatus.NOT_FOUND).json(response);
      }

      const file = fs.createReadStream(filePath);

      let fileData = Buffer.from("");
      file.on("data", (chunk) => {
        fileData = Buffer.concat([fileData, chunk]);
      });

      file.on("end", () => {
        response.StatusCode = HttpStatus.OK;
        response.Message = "Archivo encontrado";
        response.Data = fileData.toString("base64");

        response.setHeader("Content-Type", "application/octet-stream");
        response.setHeader(
          "Content-Disposition",
          `attachment; filename=${fileName}`
        );

        response.json(`${inicio}${response.toString()}`);
      });
    });
  } catch (error) {
    response.json({ status: 500, mensaje: "Error del servidor" + error });
  }
};
