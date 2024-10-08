import { Sequelize } from "sequelize";

async function connectToDB(dbURI) {
  console.log(`Connecting to DB: ${dbURI}`);

  const sequelize = new Sequelize(dbURI, {
    logging: console.log,
    define: {
      timestamps: false,
      underscored: true,
      timezone: 'UTC',
      dialectOptions: {
        useUTC: true, 
      },
    },
  });

  try {
    await sequelize.authenticate();
    console.log('Connected to Db successfully!');
  } catch (error) {
    console.error('Unable to connect to DB:', error);
  }

  return sequelize;
}

export default connectToDB;