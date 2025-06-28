import { Sequelize } from 'sequelize-typescript'
import { config } from './env'

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
    models: [],
    logging: false,
});

export { sequelize }