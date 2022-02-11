const join = require('path').join;

const config = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, './**/*.entity{.ts,.js}')],
  synchronize: false,
  migrationsRun: true,
  autoLoadEntities: true,
  migrations: [join(__dirname + '/src/app/database/migration/**/*.{js,ts}')],
  cli: {
    migrationsDir: '/src/app/database/migrations/',
  },
  logging: true,
  logNotifications: true
};

module.exports = config;
