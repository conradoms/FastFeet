import * as Yup from 'yup';
import FilesService from '../services/FilesService';
import DeliveryManService from '../services/DeliveryManService';

class DeliveryManController {
  async store(req, res) {
    const { name, email, avatar_id } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Delivery man validation fails' });
    }

    const existingDeliveryMan = await DeliveryManService.isEmailAlreadyInUse(
      email
    );

    if (existingDeliveryMan !== null) {
      return res.status(401).json('This e-mail is already in use.');
    }

    if (avatar_id) {
      const existingAvatar = await FilesService.existingFile(avatar_id);

      if (!existingAvatar) {
        return res.status(401).json('Avatar not found');
      }

      const isAlreadyInUse = await DeliveryManService.isAvatarAlreadyInUse(
        avatar_id
      );

      if (isAlreadyInUse) {
        return res.status(401).json('Avatar is already in use');
      }
    }

    const deliveryMan = await DeliveryManService.create({
      name,
      email,
      avatar_id,
    });

    return res.json(deliveryMan);
  }

  async index(req, res) {
    const { page } = req.query;

    const deliveryMen = await DeliveryManService.findAll(page);

    if (!deliveryMen) {
      return res.status(401).json({ error: 'No delivery man found' });
    }

    return res.json(deliveryMen);
  }

  async update(req, res) {
    const { email, avatar_id } = req.body;
    const { id } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Delivery man validation fails' });
    }

    const deliveryMan = await DeliveryManService.findByPk(id);

    if (!deliveryMan) {
      return res.status(401).json('Delivery man not found');
    }

    const existingEmail = await DeliveryManService.isEmailAlreadyInUse(
      email,
      id
    );

    if (existingEmail) {
      return res.status(401).json('This e-mail is already in use.');
    }

    if (avatar_id) {
      const existingAvatar = await FilesService.existingFile(avatar_id);

      if (!existingAvatar) {
        return res.status(401).json('Avatar not found');
      }

      const isAlreadyInUse = await DeliveryManService.isAvatarAlreadyInUse(
        avatar_id,
        id
      );

      if (isAlreadyInUse) {
        return res.status(401).json('Avatar is already in use');
      }
    }

    const updatedDeliveryMan = await DeliveryManService.update(req.body, id);

    return res.json(updatedDeliveryMan);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryMan = await DeliveryManService.findByPk(id);

    if (!deliveryMan) {
      return res.status(401).json({ error: 'Delivery man not found' });
    }

    await DeliveryManService.delete(id);

    return res.status(204).send();
  }
}

export default new DeliveryManController();
