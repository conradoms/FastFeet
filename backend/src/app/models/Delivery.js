import { Model, Sequelize } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Files, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
    this.belongsTo(models.Recipients, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });
    this.belongsTo(models.DeliveryMan, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });
  }
}

export default Delivery;
