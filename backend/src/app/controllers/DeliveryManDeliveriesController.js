import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

class DeliveryManDeliveriesController {
  async index(req, res) {
    const { id } = req.params;

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        end_date: {
          [Op.not]: null,
        },
      },
    });

    return res.json(deliveries);
  }
}

export default new DeliveryManDeliveriesController();
