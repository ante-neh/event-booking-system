import { Sequelize } from 'sequelize-typescript'
import { config } from './env'
import { Users } from '../models/user';
import { RefreshToken } from '../models/refresh-token';

const nodEnv = config['NODE_ENV']as 'development' | 'test' | 'production';
const dbConfig = config[nodEnv];

const sequelize: Sequelize = new Sequelize({
    database: dbConfig.database,
    username: dbConfig.username,
    password: dbConfig.password,
    dialect: dbConfig.dialect,
    host: dbConfig.host,
    dialectOptions: dbConfig.dialectOptions,
    protocol: dbConfig.protocol,
    pool:{

    },
    retry:{
        max: 3
    },
    models: [Users, RefreshToken],
    logging: false,
});

export { sequelize }