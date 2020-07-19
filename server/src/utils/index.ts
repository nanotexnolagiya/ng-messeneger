import * as path from 'path';
import * as multer from 'multer';
import * as mkdirp from 'mkdirp';
import config from "../config";

export const multerStorage = multer({
  storage: multer.diskStorage({
    destination: async (req: any, file: any, cb: any) => {
      const date = new Date();
      const dir = `${config.publicPath}/${config.uploadsPath}/${date.getFullYear()}/${date.getMonth()}`;
      await mkdirp(dir);
    },
    filename: async (_, file, cb) => {
      const fileName: string = slugify(
        file.originalname.replace(/\.[^/.]+$/, '')
      );
      const fileFullName: string = `${fileName}-${Date.now().toString() +
      path.extname(file.originalname)}`;

      cb(null, fileFullName);
    }
  }),
})

export const hasValue = (value) => {
  let result;
  if (Array.isArray(value)) {
    result = value && value.length > 0
  } else if (value && value.constructor === Object) {
    result = Object.keys(value).length > 0
  } else {
    result = !!value
  }
  return result
}

export const slugify = text => {
  return text
    .replace(/([а-яё])|([\s_])|([^a-z\d])/gi, (all, ch, space, words, i) => {
      if (space || words) {
        return space ? '-' : '';
      }

      const code = ch.charCodeAt(0);
      let next = text.charAt(i + 1);
      const index =
        code === 1025 || code === 1105
          ? 0
          : code > 1071
          ? code - 1071
          : code - 1039;
      const t = [
        'yo',
        'a',
        'b',
        'v',
        'g',
        'd',
        'e',
        'j',
        'z',
        'i',
        'y',
        'k',
        'l',
        'm',
        'n',
        'o',
        'p',
        'r',
        's',
        't',
        'u',
        'f',
        'h',
        'c',
        'ch',
        'sh',
        'shch',
        '',
        'y',
        '',
        'e',
        'yu',
        'ya'
      ];
      next = next && next.toUpperCase() === next ? 1 : 0;

      return ch.toUpperCase() === ch
        ? next
          ? t[index].toUpperCase()
          : t[index].substr(0, 1).toUpperCase() + t[index].substring(1)
        : t[index];
    })
    .toLowerCase();
};

