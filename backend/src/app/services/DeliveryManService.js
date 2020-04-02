import { Op } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';
import FilesService from './FilesService';
import Files from '../models/Files';

class DeliveryManService {
  async create({ name, email, avatar_id }) {
    return DeliveryMan.create({
      name,
      email,
      avatar_id,
    });
  }

  async delete(id) {
    const deliveryMan = await this.findByPk(id);
    const { avatar_id } = deliveryMan;

    if (avatar_id) {
      await FilesService.deleteFile(avatar_id);
    }

    await DeliveryMan.destroy({
      where: { id },
    });
  }

  async findByPk(id) {
    return DeliveryMan.findByPk(id);
  }

  async isEmailAlreadyInUse(email, deliveryManId = 0) {
    return DeliveryMan.findOne({
      where: {
        email,
        id: {
          [Op.not]: deliveryManId,
        },
      },
    });
  }

  async update(data, id) {
    const [, updatedDeliveryMan] = await DeliveryMan.update(data, {
      where: { id },
      returning: true,
    });

    return updatedDeliveryMan;
  }

  async findAll(page) {
    const deliveryMen = await DeliveryMan.findAll({
      limit: 20,
      offset: (page - 1) * 20,
      include: {
        model: Files,
        as: 'avatar',
        attributes: ['id', 'path', 'url'],
      },
    });

    return deliveryMen;
  }

  async findByEmail(email) {
    return DeliveryMan.findOne({
      where: { email },
    });
  }

  async isAvatarAlreadyInUse(avatar_id, deliveryManId = 0) {
    return DeliveryMan.findOne({
      where: {
        avatar_id,
        id: {
          [Op.not]: deliveryManId,
        },
      },
    });
  }
}

export default new DeliveryManService();
