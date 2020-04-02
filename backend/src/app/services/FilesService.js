import { resolve } from 'path';
import fs from 'fs';
import { promisify } from 'util';
import Files from '../models/Files';

class FilesService {
  async deleteFile(avatar_id) {
    const unlinkAsync = promisify(fs.unlink);

    const { path } = await Files.findByPk(avatar_id);

    const filePath = `${resolve(
      __dirname,
      '..',
      '..',
      '..',
      'tmp',
      'uploads'
    )}/${path}`;

    await unlinkAsync(filePath);

    await Files.destroy({
      where: { id: avatar_id },
    });
  }

  async existingFile(id) {
    return Files.findByPk(id);
  }
}

export default new FilesService();
