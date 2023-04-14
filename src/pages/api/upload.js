
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { NextApiRequest, NextApiResponse } from "next";

const upload = multer({
  storage: multer.diskStorage({
    destination: path.join(process.cwd(), "public", "uploads"),
    filename: (req, file, cb) => {
      const fileExtension = path.extname(file.originalname);
      const newFileName = `${uuidv4()}${fileExtension}`;
      cb(null, newFileName);
    },
  }),
});

function handler(req, res) {
  console.log(req.file); // access uploaded file info here
  res.status(200).json({ message: "File uploaded successfully." });
}

export { upload, handler };


// import { v4 as uuidv4 } from 'uuid';
// import { NextApiRequest, NextApiResponse } from 'next';

// export default function handler(req, res) {
//   const file = req.files?.file;
//   const tempPath = file?.path;
//   const fileName = file?.name;



//   if (!file || !tempPath || !fileName) {
//     return res.status(400).json({ message: 'No file was uploaded.' });
//   }

//   const fileExtension = path.extname(fileName);
//   const newFileName = `${uuidv4()}${fileExtension}`;
//   const newFilePath = path.join(process.cwd(), 'public', 'uploads', newFileName);

//   fs.copyFileSync(tempPath, newFilePath);
//   fs.unlinkSync(tempPath);

//   return res.status(200).json({ message: 'File uploaded successfully.' });
// }

