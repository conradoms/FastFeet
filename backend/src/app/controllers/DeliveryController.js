import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import DeliveryManService from '../services/DeliveryManService';
import Recipients from '../models/Recipients';

class DeliveryController {
  async store(req, res) {
    const { product, deliveryman_id, recipient_id } = req.body;

    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!schema.isValid(req.body)) {
      return res.status(401).json('Delivery validation fails');
    }

    const deliveryMan = await DeliveryManService.findByPk(deliveryman_id);

    if (!deliveryMan) {
      return res.status(401).json('Delivery man not found');
    }

    const recipient = await Recipients.findByPk(recipient_id);
    if (!recipient) {
      return res.status(401).json('Recipient not found');
    }

    const delivery = await Delivery.create({
      product,
      recipient_id,
      deliveryman_id,
    });

    // Disparar e-mail

    return res.json(delivery);
  }

  async index(req, res) {
    const deliveries = await Delivery.findAll();

    return res.json(deliveries);
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(401).json({ error: 'Delivery not found' });
    }

    await Delivery.destroy({
      where: { id },
    });

    return res.status(204).send();
  }

  async update(req, res) {
    const { id } = req.params;
    const { deliveryman_id, recipient_id } = req.body;

    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
    });

    if (!schema.isValid(req.body)) {
      return res.status(401).json('Delivery validation fails');
    }

    const deliveryMan = await DeliveryManService.findByPk(deliveryman_id);

    if (!deliveryMan) {
      return res.status(401).json('Delivery man not found');
    }

    const recipient = await Recipients.findByPk(recipient_id);
    if (!recipient) {
      return res.status(401).json('Recipient not found');
    }

    const [, updatedDelivery] = await Delivery.update(req.body, {
      where: { id },
      returning: true,
    });

    return res.json(updatedDelivery);
  }
}

export default new DeliveryController();
