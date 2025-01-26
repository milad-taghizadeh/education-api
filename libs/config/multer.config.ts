// import { diskStorage } from 'multer';
// import { extname } from 'path';

// export const multerOptions = {
//   storage: diskStorage({
//     destination: (req, file, cb) => {
//       const userId = req.user.id; // Assuming user ID is available in req.user
//       const uploadPath = `./public/images/${userId}`;
//       cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//       cb(null, `${uniqueSuffix}${extname(file.originalname)}`);
//     },
//   }),
// };