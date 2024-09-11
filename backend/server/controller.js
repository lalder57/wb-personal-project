// store handlerFunctions to be used in app.js
import { User, Pd, Course, PdTracker, CourseTracker } from '../db/model.js';
import bcryptjs from 'bcryptjs';

export const handlerFunctions = {
  /* #1 - Login
Need a body with a username and password

Will return { success: true } if the user exists and the password is correct 
or { success: false } if the user doesn't exist and/or the password is incorrect
*/
  login: async (req, res) => {
    //grab values of 'username' and 'password' from body object
    const { username, password } = req.body;
    console.log(`username: ${username}, password: ${password}`);
    // see if a user exists in the db with the provided username
    const user = await User.findOne({ where: { username: username } })    
    
    // evaluate if that worked, if not, we can already respond that the login failed
    if (!user) {
      res.send({
        message: 'Username does not exist.',
        success: false,
      })
      return
    }

    // the user was found and now we need to know if the passwords match
    if (!bcryptjs.compareSync(password, user.password)) {
      res.send({
        message: 'Password is incorrect.',
        success: false,
      })
      return
    }
    // if we're here, then the user exists 
    // AND their password was correct!
    // So I want to "save" their userId to a cookie --> req.session
    req.session.userId = user.userId
    // req.session is a cookie saved on the user's browser. 
    // so each user that visits our site sends their custom "req" object to us, and therefore, as far as their browser knows, they are "logged in"

    // if we're here, then all is a success
    // send a response including the userId:

    res.send({
      message: "user logged in",
      success: true,
      userId: req.session.userId
    })
    
  }, 

  /* #2 - Add Pd - 
Add newly created PD to the database
Will need the userId from session
Need a body with the newly added info (Pd and PdTracker models)
Will return { message: 'PD saved!'}
*/

  addPd: async (req, res) => {
    const { userId } = req.session;
    const { pdName, pdProvider, pdHours, pdDateCompleted, pdDescription, pdReflection, pdRecommend } = req.body;
    console.log(`pdName: ${pdName}`);
    const newPd = await Pd.create({
      pdName,
      pdProvider,
      pdHours,
    })
    const newPdTracker = await PdTracker.create({
      pdId: newPd.pdId,
      userId: userId,
      pdDateCompleted: new Date(),
      pdDescription,
      pdReflection,
      pdRecommend,
    })
    res.json({
      message: 'New PD saved!',
      newPd: newPd,
      newPdTracker: newPdTracker,
    })
  }
}