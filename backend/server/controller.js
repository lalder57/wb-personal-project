// store handlerFunctions to be used in app.js
import { User, Pd, Course, PdTracker, CourseTracker } from '../db/model.js';

export const handlerFunctions = {
  /* #1 - Login
Need a body with a username and password

Will return { success: true } if the user exists and the password is correct 
or { success: false } if the user doesn't exist and/or the password is incorrect
*/
  login: async (req, res) => {
    const { username, password } = req.body;
    console.log(`username: ${username}, password: ${password}`);
    const user = await User.findOne({ where: { username: username } })    
    if (user && user.password === password) {
      req.session.userId = user.userId;
      res.json({
        success: true,
      })
    } else {
      res.json({
        success: false,
      })
    }
  }
}