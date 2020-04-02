import Sequelize from 'sequelize';

import User from '../app/models/User';
import Recipients from '../app/models/Recipients';
import Files from '../app/models/Files';
import DeliveryMan from '../app/models/DeliveryMan';

import databaseConfig from '../config/database';

const models = [User, Recipients, Files, DeliveryMan];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map((model) => model.init(this.connection));
    models.map(
      (model) => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
