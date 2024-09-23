import { User, db, Pd, Course, Lane, Degree } from "./model.js";
import bcryptjs from 'bcryptjs'

await db.sync( {force: true} );

const hashedPassword = bcryptjs.hashSync('test', bcryptjs.genSaltSync(10));


const pd1 = await Pd.create({
  pdName: 'first pd',
})

const pd2 = await Pd.create({
  pdName: 'second pd',
})

console.log(pd1, pd2);

const course1 = await Course.create({
  courseName: 'first course',
})

const course2 = await Course.create({
  courseName: 'second course',
})

console.log(course1, course2);

const bachelors = await Degree.create({
  degreeName: "bachelor's"
})

const master = await Degree.create({
  degreeName: "master's"
})

const phD = await Degree.create({
  degreeName: "Ph.D"
})

const lane1 = await Lane.create({
  laneName: 'Lane 1',
  needed: 20,
  total: 20,
  degreeId: 1
});

const lane2 = await Lane.create({
  laneName: 'Lane 2',
  needed: 17,
  total: 37,
  degreeId: 1
});

const lane3 = await Lane.create({
  laneName: 'Lane 3',
  needed: 13,
  total: 50,
  degreeId: 1
});

const lane4 = await Lane.create({
  laneName: 'Lane 4',
  needed: 20,
  total: 70,
  degreeId: 1
});

const lane5 = await Lane.create({
  laneName: 'Lane 5',
  needed: 20,
  total: 90,
  degreeId: 1
})

const lane6 = await Lane.create({
  laneName: 'Lane 6',
  needed: 20,
  total: 20,
  degreeId: 2
});

const lane7 = await Lane.create({
  laneName: 'Lane 7',
  needed: 17,
  total: 37,
  degreeId: 2
});

const lane8 = await Lane.create({
  laneName: 'Lane 8',
  needed: 20,
  total: 50,
  degreeId: 2
});

const lane9 = await Lane.create({
  laneName: 'Lane 9',
  needed: 20,
  total: 20,
  degreeId: 3
});



const user1 = await User.create({
  username: 'user1',
  password: hashedPassword,
  fname: 'sam',
  lname: 'smith',
  email: '1234@gmail.com',
  school: 'Timpanogos',
  currentProgress: 1,
  admin: true,
  laneId: 2,
  degreeId: 1,
});

const user2 = await User.create({
  username: 'user2',
  password: hashedPassword,
  fname: 'alex',
  lname: 'smith',
  email: '5678@gmail.com',
  school: 'Orem High',
  currentProgress: 2,
  admin: false,
  laneId: 7,
  degreeId: 2,
});

console.log(user1, user2);








// To create many-many db entries between User - Pd
// 1. pd & user already exist, just need to connect them:
// const user = await User.findOne()
// const pd = await Pd.findOne()
// // option 1
// await user.createPdTracker({
//   pdId: pd.pdId,
//   otherFields
// })
// // Option 2
// await pd.createPdTracker({
//   userId: user.userId,
//   otherFields
// })
// // Option 3
// await PdTracker.create({
//   userId: user.userId,
//   pdId: pd.pdId,
//   otherFields
// })


await db.close();