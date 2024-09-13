import { db, User, Pd, PdTracker, Course, CourseTracker } from "./model.js"

const userPds = await PdTracker.findAll({
  where: {
    userId: 2
  },
  include: {
    model: Pd,
  } 

})

console.log(userPds[0].pd.pdName)

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

console.log(userCourses)

await db.close()