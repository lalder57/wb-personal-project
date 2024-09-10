import { User, db } from "./model.js";

await db.sync( {force: true} );

const user1 = await User.create({
  username: 'user1',
  password: 'test'
});

const user2 = await User.create({
  username: 'user2',
  password: 'test'
});

console.log(user1, user2)





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