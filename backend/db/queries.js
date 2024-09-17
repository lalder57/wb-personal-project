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

const user = await User.findOne({
  where: {
    userId: 3
  },
  include: [
    {
      model: Degree
    },
    {
      model: Lane
    },
  ]
});

// to display degree name
// console.log(user.degree.degreeName)
// to display lane name
// console.log(user.lane.laneName)
// user.currentProgress = 18;
// user.save();
// to check their current progress against the needed value of their current lane
if (user.currentProgress > user.lane.needed) {
  user.laneId = +user.laneId + 1
  user.save();
}
  console.log(user);



await db.close()