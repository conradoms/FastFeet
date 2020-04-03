import DeliveryManService from '../services/DeliveryManService';
import Delivery from '../models/Delivery';

class DeliveryPendingsController {
  async index(req, res) {
    const { id } = req.params;

    const deliveryMan = await DeliveryManService.findByPk(id);

    if (!deliveryMan) {
      return res.status(401).json('Delivery man not found');
    }

    const pendings = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: null,
      },
    });

    return res.json(pendings);
  }
}

export default new DeliveryPendingsController();
