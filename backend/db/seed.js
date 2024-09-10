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


await db.close();