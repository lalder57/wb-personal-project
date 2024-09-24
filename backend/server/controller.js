// store handlerFunctions to be used in app.js
import {
  User,
  Pd,
  Course,
  PdTracker,
  CourseTracker,
  Degree,
  Lane,
} from "../db/model.js";
import bcryptjs from "bcryptjs";

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
    const user = await User.findOne({ where: { username: username } });

    // evaluate if that worked, if not, we can already respond that the login failed
    if (!user) {
      res.send({
        message: "Username does not exist.",
        success: false,
      });
      return;
    }

    // the user was found and now we need to know if the passwords match
    if (!bcryptjs.compareSync(password, user.password)) {
      res.send({
        message: "Password is incorrect.",
        success: false,
      });
      return;
    }
    // if we're here, then the user exists
    // AND their password was correct!
    // So I want to "save" their userId to a cookie --> req.session
    req.session.userId = user.userId;
    // req.session is a cookie saved on the user's browser.
    // so each user that visits our site sends their custom "req" object to us, and therefore, as far as their browser knows, they are "logged in"

    // if we're here, then all is a success
    // send a response including the userId:

    res.send({
      message: "user logged in",
      success: true,
      userId: req.session.userId,
      admin: user.admin,
    });
  },

  logout: async (req, res) => {
    req.session.destroy();

    res.send({
      message: "user logged out",
      success: true,
    });
    return;
  },

  register: async (req, res) => {
    // Get values of username and password from req.body  --- change to degreeId
    const {
      username,
      password,
      fname,
      lname,
      email,
      school,
      degreeId,
      laneId,
      admin,
      currentProgress,
    } = req.body;
    console.log(`REG username: ${username}, REG password: ${password}`);
    // Check to see if there are any users with the same username, if so, send an error message
    if (await User.findOne({ where: { username: username } })) {
      res.send({
        message: "Username already exists",
        success: false,
      });
      return;
    }

    // If we get to this point, the username is available

    const hashedPassword = bcryptjs.hashSync(
      password,
      bcryptjs.genSaltSync(10)
    );

    // Create new user with the information
    const user = await User.create({
      username,
      password: hashedPassword,
      fname,
      lname,
      email,
      school,
      laneId,
      degreeId,
      currentProgress,
      admin,
    });

    // if degreeId === 1, 2, 3 create the appropriate userLane to determine their degree and their lane when they first sign up

    // set req.session.userId to user.userId after creating the user
    req.session.userId = user.userId;

    // Send message
    res.send({
      message: "New user created!",
      success: true,
      userId: user.userId,
      admin: user.admin,
    });
  },

  checkSession: async (req, res) => {
    // when this function is called, we simply want to check if there is a userId on the req.session object, and send it back if so
    if (req.session.userId) {
      const user = await User.findOne({
        where: {
          userId: req.session.userId,
        },
      });

      res.send({
        message: "user is still logged in",
        success: true,
        userId: req.session.userId,
        admin: user.admin,
      });
      return;
    } else {
      res.send({
        message: "no user logged in",
        success: false,
      });
      return;
    }
  },

  /* #5 - Add Pd - 
Add newly created PD to the database
Will need the userId from session
Need a body with the newly added info (Pd and PdTracker models)
Will return { message: 'PD saved!'}
*/

  addPd: async (req, res) => {
    // grab userId from req.session
    const { userId } = req.session;
    // grab values of Pd model and PdTracker model from req.body
    const {
      // maybe have the pdId connected to the selector
      pdId,
      pdName,
      pdProvider,
      pdHours,
      pdDateCompleted,
      pdDescription,
      pdReflection,
      pdRecommend,
    } = req.body;

    console.log(`pdName: ${pdName}`);

    // if Pd exists in DB: then just create a new PdTracker with the userId and the pdId of that one
    const pd = await Pd.findOne({ where: { pdName: pdName } });
    if (pd) {
      console.log("pdName already exists");

      const newPdTracker = await PdTracker.create({
        pdId: pd.pdId,
        userId: userId,
        pdProvider,
        pdHours,
        pdDateCompleted,
        pdDescription,
        pdReflection,
        pdRecommend,
      });
      // send success message
      res.send({
        message: "PD successfully added",
        success: true,
        PdName: pdName,
        newPdTracker: newPdTracker,
      });
    } else {
      // create a new Pd if pdName doesn't exist
      console.log("pdName does not exist, create a new pd");
      const newPd = await Pd.create({
        pdName,
      });

      // create a new PdTracker with the userId and the newPd.pdId
      const newPdTracker = await PdTracker.create({
        pdId: newPd.pdId,
        userId: userId,
        pdProvider,
        pdHours,
        pdDateCompleted,
        pdDescription,
        pdReflection,
        pdRecommend,
      });

      // send success message
      res.send({
        message: "New PD saved!",
        sucess: true,
        newPd: newPd,
        newPdTracker: newPdTracker,
      });
    }
  },

  /* #6 -- addCourse
  Add newly created courses to the database
  Will need the userId from session
  Need a body with the newly added info (course and CourseTracker models)
  Will return { message: 'course saved!'}
  */
  addCourse: async (req, res) => {
    // grab userId from req.session
    const { userId } = req.session;

    // grab values of Course model and CourseTracker model from req.body
    const {
      // maybe have the courseId connected to the selector
      courseId,
      courseName,
      courseProvider,
      courseCredits,
      courseDateCompleted,
      courseDescription,
      courseReflection,
      courseRecommend,
    } = req.body;

    console.log(`courseName: ${courseName}`);

    // if course exists in DB: then just create a new courseTracker with the userId and the courseId of that one
    const course = await Course.findOne({ where: { courseName: courseName } });
    if (course) {
      console.log("courseName already exists");

      const newCourseTracker = await CourseTracker.create({
        courseId: course.courseId,
        userId: userId,
        courseProvider,
        courseCredits,
        courseDateCompleted,
        courseDescription,
        courseReflection,
        courseRecommend,
      });

      // FIGURE OUT HOW TO NOT DUPLICATE: do sequelize query to find the user (to get their lane and their degree)
      const user = await User.findOne({
        where: {
          userId: userId,
        },
        include: [
          {
            model: Lane,
          },
          {
            model: Degree,
          },
        ],
      });

      // update the user's current progress
      user.currentProgress =
        user.currentProgress + newCourseTracker.courseCredits;
      user.save();
      // console.log(user.currentProgress);

      // check to see if their current progress exceeds the needed amount for that lane.
      // If so, update their lane and reset their current progress to 0, or leftover value if necessary
      // console.log(user.lane.laneId);

      if (user.currentProgress >= user.lane.needed) {
        if (+user.laneId === 5 || +user.laneId === 8 || +user.laneId === 9) {
          const newLane = await Lane.findOne({
            where: {
              laneId: +user.laneId + 1,
            },
          });
          console.log(newLane);
          if (user.degreeId === newLane.degreeId) {
            user.laneId = newLane.laneId;
          }
          user.save();
        } else {
          user.currentProgress = user.currentProgress - user.lane.needed;
          const newLane = await Lane.findOne({
            where: {
              laneId: +user.laneId + 1,
            },
          });
          console.log(newLane);
          if (user.degreeId === newLane.degreeId) {
            user.laneId = newLane.laneId;
          }
          user.save();
        }
      }

      // send success message
      res.send({
        message: "course successfully added",
        success: true,
        courseName: courseName,
        newCourseTracker: newCourseTracker,
      });
    } else {
      // create a new course if courseName doesn't exist
      console.log("courseName does not exist, create a new course");
      const newCourse = await Course.create({
        courseName,
      });

      // create a new courseTracker with the userId and the newcourse.courseId
      const newCourseTracker = await CourseTracker.create({
        courseId: newCourse.courseId,
        userId: userId,
        courseProvider,
        courseCredits,
        courseDateCompleted,
        courseDescription,
        courseReflection,
        courseRecommend,
      });

      // do sequelize query to find the user (to get their lane and their degree)
      const user = await User.findOne({
        where: {
          userId: userId,
        },
        include: [
          {
            model: Lane,
          },
          {
            model: Degree,
          },
        ],
      });

      // update the user's current progress
      user.currentProgress =
        user.currentProgress + newCourseTracker.courseCredits;
      user.save();
      // console.log(user.currentProgress);

      // check to see if their current progress exceeds the needed amount for that lane.
      // If so, update their lane and reset their current progress to 0
      // console.log(user.lane.laneId);

      if (user.currentProgress >= user.lane.needed) {
        if (+user.laneId === 5 || +user.laneId === 8 || +user.laneId === 9) {
          const newLane = await Lane.findOne({
            where: {
              laneId: +user.laneId + 1,
            },
          });
          console.log(newLane);
          if (user.degreeId === newLane.degreeId) {
            user.laneId = newLane.laneId;
          }
          user.save();
        } else {
          user.currentProgress = user.currentProgress - user.lane.needed;
          const newLane = await Lane.findOne({
            where: {
              laneId: +user.laneId + 1,
            },
          });
          console.log(newLane);
          if (user.degreeId === newLane.degreeId) {
            user.laneId = newLane.laneId;
          }
          user.save();
        }
      }

      // send success message
      res.send({
        message: "New course saved!",
        sucess: true,
        newCourse: newCourse,
        newCourseTracker: newCourseTracker,
      });
    }
  },

  /* #7 -- Show user their completed pds and courses
  Get request to find all pds and courses that have the userId
  will need the userId 
  will return {message: 'Here's your info', success: true, info: info }
  */

  getUserInfo: async (req, res) => {
    // grab the userId from the session
    const { userId } = req.session;
    if (userId) {
      const user = await User.findOne({
        where: {
          userId: userId,
        },
        include: [
          {
            model: Lane,
          },
          {
            model: Degree,
          },
        ],
      });

      // do a sequelize query for any pd_trackers with the userId
      const userPds = await PdTracker.findAll({
        where: {
          userId: userId,
        },
        include: {
          model: Pd,
        },
      });

      const userCourses = await CourseTracker.findAll({
        where: {
          userId: userId,
        },
        include: {
          model: Course,
        },
      });

      console.log(user);

      // console.log(user.currentProgress)

      // send success message
      res.send({
        message: "Here's your info!",
        succes: true,
        fname: user.fname,
        userPds: userPds,
        userCourses: userCourses,
        userId: userId,
        userAdmin: user.admin,
        userLane: user.lane,
        userDegree: user.degree,
        userCurrentProgress: user.currentProgress,
      });
    } else {
      res.sendStatus(401);
    }
  },

  // will send back all the existing pds in the DB
  getPds: async (req, res) => {
    const allPds = await Pd.findAll();

    res.send({
      message: "Here are all the existing PDs",
      succes: true,
      allPds: allPds,
    });
  },

  // will send back all the existing courses in the DB
  getCourses: async (req, res) => {
    const allCourses = await Course.findAll();

    res.send({
      message: "Here are all the existing courses",
      success: true,
      allCourses: allCourses,
    });
  },

  // will send back a specific pdTracker with it's details
  getPdDetails: async (req, res) => {
    console.log("HIT PD DETAILS");
    const { pdTrackerId } = req.params;
    console.log(+pdTrackerId);

    const pdDetails = await PdTracker.findOne({
      where: {
        pdTrackerId: pdTrackerId,
      },
      include: {
        model: Pd,
      },
    });

    // send success message:
    res.send({
      message: `Here are the details for your requested PD`,
      succes: true,
      pdDetails: pdDetails,
    });
  },
  // will send back a specific courseTracker with it's details
  getCourseDetails: async (req, res) => {
    const { courseTrackerId } = req.params;

    const courseDetails = await CourseTracker.findOne({
      where: {
        courseTrackerId: courseTrackerId,
      },
      include: {
        model: Course,
      },
    });

    // send success message:
    res.send({
      message: `Here are the details for your requested course`,
      succes: true,
      courseDetails: courseDetails,
    });
  },
  updateDegree: async (req, res) => {
    // get userId from the session
    const { userId } = req.session;

    // get degreeId from req.body
    const { degreeId } = req.body;

    // do a sequelize query to find the user
    const user = await User.findOne({
      where: {
        userId: userId,
      },
    });

    // update user degreeId and update their lane if they change

    user.degreeId = degreeId;
    await user.save();
    console.log(user.degreeId);

    if (+user.degreeId === 2) {
      console.log("HIT DEGREE 2");
      user.laneId = 6;
      user.currentProgress = 0;
    } else if (+user.degreeId === 3) {
      console.log("HIT DEGREE 3");
      user.laneId = 9;
      user.currentProgress = 0;
    }
    await user.save();

    // send success message

    res.send({
      message: "Degree updated successfully!",
      success: true,
      degreeId: degreeId,
      laneId: user.laneId,
    });
  },
  // put request to edit a pd's information
  // will need a body obj and the pdId or the pdTrackerId (maybe from req.params if not in the body obj)
  editPd: async (req, res) => {
    console.log("HIT EDIT PD");
    // get pdTrakcerId from req.params
    const { pdTrackerId } = req.params;
    console.log(pdTrackerId);

    // do a sequelize query to find the right pdTracker
    const pdTracker = await PdTracker.findOne({
      where: {
        pdTrackerId: pdTrackerId,
      },
    });
    // get pdTracker info from req.body;
    const {
      pdProvider,
      pdHours,
      pdDateCompleted,
      pdDescription,
      pdReflection,
      pdRecommend,
    } = req.body;

    // update pdTracker info with the user's new input

    (pdTracker.pdProvider = pdProvider),
      (pdTracker.pdHours = pdHours),
      (pdTracker.pdDateCompleted = pdDateCompleted);
    pdTracker.pdDescription = pdDescription;
    pdTracker.pdReflection = pdReflection;
    pdTracker.pdRecommend = pdRecommend;
    pdTracker.save();

    // send success message

    res.send({
      message: "Your PD has been successfully updated!",
      success: true,
      pdTracker: pdTracker,
    });
  },
  // put request to edit a course's information
  // will need a body obj and the courseId or the courseTrackerId (maybe from req.params if not in the body obj)
  editCourse: async (req, res) => {
    console.log("HIT EDIT COURSE");
    // get pdTrakcerId from req.params
    const { courseTrackerId } = req.params;
    console.log(courseTrackerId);

    // do a sequelize query to find the right courseTracker
    const courseTracker = await CourseTracker.findOne({
      where: {
        courseTrackerId: courseTrackerId,
      },
    });
    // get courseTracker info from req.body;
    const {
      courseProvider,
      courseCredits,
      courseDateCompleted,
      courseDescription,
      courseReflection,
      courseRecommend,
    } = req.body;

    // ucourseate courseTracker info with the user's new input

    (courseTracker.courseProvider = courseProvider),
      (courseTracker.courseCredits = courseCredits),
      (courseTracker.courseDateCompleted = courseDateCompleted);
    courseTracker.courseDescription = courseDescription;
    courseTracker.courseReflection = courseReflection;
    courseTracker.courseRecommend = courseRecommend;
    courseTracker.save();

    // send success message

    res.send({
      message: "Your course has been successfully updated!",
      success: true,
      courseTracker: courseTracker,
    });
  },
  // delete pd
  // will need to get the pdTrackerId from req.params
  deletePd: async (req, res) => {
    // grab the pdTrackerId from req.params
    const { pdTrackerId } = req.params;

    const pdTracker = await PdTracker.findOne({
      where: {
        pdTrackerId: pdTrackerId,
      },
    });

    await pdTracker.destroy();

    // send message
    res.send({
      message: "PD successfully deleted",
      success: true,
    });
  },
  // delete course
  // will need to get the courseTrackerId from req.params
  deleteCourse: async (req, res) => {
    console.log("HIT DELETE COURSE");
    // grab the pdTrackerId from req.params
    const { courseTrackerId } = req.params;

    const courseTracker = await CourseTracker.findOne({
      where: {
        courseTrackerId: courseTrackerId,
      },
    });
    console.log(courseTracker);

    const user = await User.findOne({
      where: {
        userId: courseTracker.userId,
      },
    });

    // math to calculate the user's current progress now
    // when subtracting the amount of credits their deleted course was worth

    console.log(courseTracker);

    user.currentProgress = user.currentProgress - courseTracker.courseCredits;
    await user.save();

    if (user.currentProgress < 0) {
      const newLane = await Lane.findOne({
        where: {
          laneId: +user.laneId - 1,
        },
      });
      user.laneId = newLane.laneId;
      user.currentProgress = user.currentProgress + newLane.needed;
      await user.save();
    }

    await courseTracker.destroy();

    // send message
    res.send({
      message: "Course successfully deleted",
      success: true,
    });
  },
  // get a user's profile info
  // will need to get the pdTrackerId from req.params
  getProfileInfo: async (req, res) => {
    // grab userId from req.session
    const { userId } = req.session;

    const user = await User.findOne({
      where: {
        userId: userId,
      },
    });

    // send message
    res.send({
      message: "Here's your profile information",
      success: true,
      user: user,
    });
  },
  // get a list of all pds a user has completed
  getUserPds: async (req, res) => {
    // grab userId from req.session
    const { userId } = req.session;

    // do a sequelize query for any pd_trackers with the userId, include Pd model
    const userPds = await PdTracker.findAll({
      where: {
        userId: userId,
      },
      include: {
        model: Pd,
      },
    });

    // send success message
    res.send({
      message: "Here are all your PDs!",
      success: true,
      userPds: userPds,
    });
  },

  // get list of all courses a user has taken
  getUserCourses: async (req, res) => {
    // get userId from req.session
    const { userId } = req.session;

    // do a sequelize query to get all courses a user has taken
    const userCourses = await CourseTracker.findAll({
      where: {
        userId: userId,
      },
      include: {
        model: Course,
      },
    });

    // send success message
    res.send({
      message: "Here are all your completed courses!",
      success: true,
      userCourses: userCourses,
    });
  },
  // get request to get all users' pdTrackers and courses
  getAllUserData: async (req, res) => {
    // sequelize query to get all users with all tables included
    const users = await User.findAll({
      include: {
        all: true,
        nested: true,
      },
    });

    // send success message 
    res.send({
      message: "Here is all the data for all users",
      success: true,
      users: users
    })
  },
};
