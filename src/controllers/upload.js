const fs = require("fs");
const {db} = require("../models/index.model");

const userImages = db.userImages;
const uploadFiles = async (req, res) => {
  try {
    console.log(req.file);
    if (req.file == undefined) {
      return res.send(`You must select a file.`);
    }
    let obj={
        type: req.file.mimetype,
        name: req.file.originalname,
        data: fs.readFileSync(
          __basedir + "/assets/uploads/" + req.file.filename
        ),
    }
    userImages.create(obj).then((image) => {
      fs.writeFileSync(
        __basedir + "/assets/tmp/" + image.name,
        image.data
      );
      return res.send(`File has been uploaded.`);
    });

  } catch (error) {
    console.log(error);
    return res.send(`Error when trying upload images: ${error}`);
  }
};
module.exports = {
  uploadFiles,
};