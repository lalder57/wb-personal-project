import { User, db, Pd, Course } from "./model.js";
import bcryptjs from 'bcryptjs'

await db.sync( {force: true} );

const hashedPassword = bcryptjs.hashSync('test', bcryptjs.genSaltSync(10));

const user1 = await User.create({
  username: 'user1',
  password: hashedPassword,
  fname: 'sam',
  lname: 'smith',
  email: '1234@gmail.com',
  district: 'Alpine',
  degree: '1'
});

const user2 = await User.create({
  username: 'user2',
  password: hashedPassword,
  fname: 'alex',
  lname: 'smith',
  email: '5678@gmail.com',
  district: 'Alpine',
  degree: '2'
});

console.log(user1, user2);

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