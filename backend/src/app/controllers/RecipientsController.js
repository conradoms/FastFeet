import * as Yup from 'yup';
// import Sequelize from 'sequelize';
import Recipients from '../models/Recipients';

class RecipientsController {
  async store(req, res) {
    const {
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    } = req.body;

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Recipient validation fails' });
    }

    const recipient = await Recipients.create({
      name,
      street,
      number,
      complement,
      state,
      city,
      zip_code,
    });

    return res.json(recipient);
  }

  async update(req, res) {
    const { id: recipientId } = req.params;

    const schema = Yup.object().shape({
      name: Yup.string().trim().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zip_code: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Recipient validation fails' });
    }

    const recipient = await Recipients.findByPk(recipientId);

    if (!recipient) {
      return res.status(401).json({ error: 'Recipient Not Found!' });
    }

    const [, updatedRecipient] = await Recipients.update(req.body, {
      where: { id: recipientId },
      returning: true,
    });

    return res.json({ updatedRecipient });
  }
}

export default new RecipientsController();
