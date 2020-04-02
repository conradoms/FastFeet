import * as Yup from 'yup';
import { Op } from 'sequelize';
import DeliveryMan from '../models/DeliveryMan';

class DeliveryManController {
  async store(req, res) {
    const { name, email } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Delivery man validation fails' });
    }

    const existingDeliveryMan = await DeliveryMan.findOne({
      where: { email },
    });

    if (existingDeliveryMan !== null) {
      return res.status(401).json('This e-mail is already in use.');
    }

    const deliveryMan = await DeliveryMan.create({
      name,
      email,
    });

    return res.json(deliveryMan);
  }

  async index(req, res) {
    const deliveryMen = await DeliveryMan.findAll();

    if (!deliveryMen) {
      return res.status(401).json({ error: 'No delivery man found' });
    }

    return res.json(deliveryMen);
  }

  async update(req, res) {
    const { email } = req.body;
    const { id } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Delivery man validation fails' });
    }

    const deliveryMan = await DeliveryMan.findByPk(id);

    if (!deliveryMan) {
      return res.status(401).json('Delivery man not found');
    }

    const existingEmail = await DeliveryMan.findOne({
      where: {
        email,
        id: {
          [Op.not]: id,
        },
      },
    });

    if (existingEmail) {
      return res.status(401).json('This e-mail is already in use.');
    }

    const [, updatedDeliveryMan] = await DeliveryMan.update(req.body, {
      where: { id },
      returning: true,
    });

    return res.json(updatedDeliveryMan);
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryMan = await DeliveryMan.findByPk(id);

    if (!deliveryMan) {
      return res.status(401).json({ error: 'Delivery man not found' });
    }

    await DeliveryMan.destroy({
      where: { id },
    });

    return res.status(204).send();
  }
}

export default new DeliveryManController();
