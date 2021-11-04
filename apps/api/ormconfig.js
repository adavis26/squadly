const join = require('path').join;

module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '/src/app/database/entities/**/*.{.js,ts}')],
  autoLoadEntities: true,
  synchronize: true,
  migrations: [__dirname + '/src/app/database/migrations/**/*.{js,ts}'],
  cli: {
    migrationsDir: [__dirname + '/src/app/database/migrations']
  },
  seeds: [__dirname + '/src/app/database/seeds/**/*{.ts,.js}'],
};
