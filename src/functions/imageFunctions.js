import { createWriteStream, unlink } from 'fs';
import { parse, join } from 'path';
import { promisify } from 'util';

const saveImage = async (image, dirname, id) => {
  const { filename, mimetype, createReadStream } = image;

  if (!mimetype.startsWith('image')) {
    throw createError(400, 'Not an image! Please upload only images.');
  }

  let stream = createReadStream();

  let { ext, name } = parse(filename);

  name = `${dirname}-${id}-${Date.now()}${ext}`;

  let writeStream = await createWriteStream(
    join(__dirname, `../uploads/${dirname}/${name}`)
  );

  await stream.pipe(writeStream);

  return name;
};

const removeImage = async (imageName, dirname) => {
  await promisify(unlink)(
    join(__dirname, `../uploads/${dirname}/${imageName}`)
  );
};

export { saveImage, removeImage };
