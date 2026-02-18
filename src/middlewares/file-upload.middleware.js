import { numberSchema } from '#validations/common.validation';
import multer from 'multer';

const myStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        let destinationFolder = './public/profile'; // Default: profile pic directory
        if (file.fieldname === 'pictures') {
            // for blog images
            const result = numberSchema.safeParse(req.params.blog_id);
            if (result.error) {
                return cb('something went wrong with blog id!', null);
            }
            req.blog_id = result.data;
            destinationFolder = './public/images';
        }
        cb(null, destinationFolder);
    },
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${file.originalname}`;
        if (req.uniqueName) {
            // multiple file names join with , seprated
            req.uniqueName += `, ${uniqueName}`;
        } else {
            req.uniqueName = uniqueName;
        }

        cb(null, uniqueName);
    },
});

const multerInstance = multer({ storage: myStorage });
export default multerInstance;
