import { db, User, Pd, PdTracker, Course, CourseTracker, Degree, Lane } from "./model.js"

const userPds = await PdTracker.findAll({
  where: {
    userId: 2
  },
  include: {
    model: Pd,
  } 

})

// console.log(userPds[0].pd.pdName)

// const newCourseTracker = await CourseTracker.create({
//   courseId: 1, 
//   userId: 2,
//   courseProvider: "School",
//   courseCredits: 3,
//   courseDateCompleted: new Date(),
//   courseDescription: "",
//   courseReflection: "",
//   courseRecommend: true,
// })

// console.log(newCourseTracker)

const userCourses = await CourseTracker.findAll({
  where: {
    userId: 2
  },
  include: {
    model: Course,
  }
})

// console.log(userCourses)

// const users = await User.findAll({
//   include: [
//     {
//       model: CourseTracker,
//       include: [Course]
//     },
//     {
//       model: PdTracker,
//       include: [Pd]
//     },
//   ]
// });

const users = await User.findAll({
  include: {
    all: true,
    nested: true
  }
})

// to display degree name
// console.log(user.degree.degreeName)
// to display lane name
// console.log(user.lane.laneName)
// user.currentProgress = 18;
// user.save();
// to check their current progress against the needed value of their current lane
// if (user.currentProgress > user.lane.needed) {
//   user.laneId = +user.laneId + 1
//   user.save();
// }

// to get all the way to the name of the first pd of the first user
// why does it have an underscore for pdTrackers and courseTrackers
  // console.log(users[0].pd_trackers[0].pd.pdName);

  console.log(users)




await db.close()