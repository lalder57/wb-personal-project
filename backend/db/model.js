import { DataTypes, Model } from "sequelize";
import util from 'util';
import url from 'url';
import connectToDB from "./db.js";

export const db = await connectToDB('postgresql:///task_tracker');

// Model Definitions
export class User extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
};

User.init (
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    }, 
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    }, 
    fname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    modelName: 'user',
    sequelize: db,
  },
);

export class Pd extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
};

Pd.init (
  {
    pdId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    pdName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'pd',
    sequelize: db,
  },
);

export class Course extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
};

Course.init (
  {
    courseId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    courseName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },
  {
    modelName: 'course',
    sequelize: db,
  },
);

export class CourseTracker extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
};

CourseTracker.init (
  {
    courseTrackerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    courseProvider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    courseCredits: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseDateCompleted: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    courseDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    courseReflection: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    courseRecommend: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
  },
  {
    modelName: 'course_tracker',
    sequelize: db,
  },
);

export class PdTracker extends Model {
  [util.inspect.custom]() {
    return this.toJSON();
  }
};

PdTracker.init (
  {
    pdTrackerId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    pdProvider: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pdHours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pdDateCompleted: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    pdDescription: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pdReflection: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    pdRecommend: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },

  },
  {
    modelName: 'pd_tracker',
    sequelize: db,
  },
);

// Define Model Relationships

User.hasMany(PdTracker, { foreignKey: 'userId' });
PdTracker.belongsTo(User, { foreignKey: 'userId' });
Pd.hasMany(PdTracker, { foreignKey: 'pdId' });
PdTracker.belongsTo(Pd, { foreignKey: 'pdId' });

User.hasMany(CourseTracker, { foreignKey: 'userId' });
CourseTracker.belongsTo(User, { foreignKey: 'userId' });
Course.hasMany(CourseTracker, { foreignKey: 'courseId' });
CourseTracker.belongsTo(Course, { foreignKey: 'courseId' });



if (process.argv[1] === url.fileURLToPath(import.meta.url)) {
  console.log('syncing to database...');
  await db.sync();
  //  await db.sync({force: true})
  console.log('Finished syncing database');
};



