import { Sequelize} from 'sequelize-typescript'
import url from 'url';
import { DaoMembership } from './daomembership.entity';
import { DaoRole } from './daorole';
import { Logger } from '@nestjs/common';
import { database } from '../../config';

const logger = new Logger('DB');
const dbUrl = process.env.DATABASE_URL || `postgres://localhost:5432/${database}`;

const dbConfig = parseConnectionString(dbUrl);
logger.log(JSON.stringify(dbConfig));

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        database: dbConfig.database,
        host: dbConfig.host,
        port: dbConfig.port,
        username: dbConfig.username,
        password: dbConfig.password
      });
      sequelize.addModels([DaoMembership, DaoRole]);
      await sequelize.sync();
      return sequelize;
    },
  },
];

function parseConnectionString(connectionString: string): any {

  let config: any = {};
  let options: any = {}

  const urlParts = url.parse(connectionString);

  options.dialect = urlParts.protocol?.replace(/:$/, '');
  options.host = urlParts.hostname;

  if (urlParts.pathname) {
      config.database = urlParts.pathname.replace(/^\//, '');
  }

  if (urlParts.port) {
      options.port = urlParts.port;
  }

  if (urlParts.auth) {
      const authParts = urlParts.auth.split(':');

      config.username = authParts[0];

      if (authParts.length > 1)
          config.password = authParts.slice(1).join(':');
  }

  let result = Object.assign({}, config, options);

  return result;
}