import {
  User,
  db,
  Pd,
  Course,
  Lane,
  Degree,
  PdTracker,
  CourseTracker,
} from "./model.js";
import bcryptjs from "bcryptjs";

await db.sync({ force: true });

const hashedPassword = bcryptjs.hashSync("test", bcryptjs.genSaltSync(10));

const pd1 = await Pd.create({
  pdName: "Classroom Management",
});

const pd2 = await Pd.create({
  pdName: "Digital Learning Technologies",
});

const pd3 = await Pd.create({
  pdName: "Project-Based-Learning",
});

const pd4 = await Pd.create({
  pdName: "Student Engagement Strategies",
});

const course1 = await Course.create({
  courseName: "CSS 100",
});

const course2 = await Course.create({
  courseName: "CS 350",
});

const course3 = await Course.create({
  courseName: "Intro to React",
});

const course4 = await Course.create({
  courseName: "JavaScript Basics",
});

const course5 = await Course.create({
  courseName: "Basics of Angular",
});

const course6 = await Course.create({
  courseName: "Styling with Tailwind",
});

console.log(course1, course2);

const bachelors = await Degree.create({
  degreeName: "bachelor's",
});

const master = await Degree.create({
  degreeName: "master's",
});

const phD = await Degree.create({
  degreeName: "Ph.D",
});

const lane1 = await Lane.create({
  laneName: "Lane 1",
  needed: 20,
  total: 20,
  degreeId: 1,
});

const lane2 = await Lane.create({
  laneName: "Lane 2",
  needed: 17,
  total: 37,
  degreeId: 1,
});

const lane3 = await Lane.create({
  laneName: "Lane 3",
  needed: 13,
  total: 50,
  degreeId: 1,
});

const lane4 = await Lane.create({
  laneName: "Lane 4",
  needed: 20,
  total: 70,
  degreeId: 1,
});

const lane5 = await Lane.create({
  laneName: "Lane 5",
  needed: 20,
  total: 90,
  degreeId: 1,
});

const lane6 = await Lane.create({
  laneName: "Lane 6",
  needed: 20,
  total: 20,
  degreeId: 2,
});

const lane7 = await Lane.create({
  laneName: "Lane 7",
  needed: 17,
  total: 37,
  degreeId: 2,
});

const lane8 = await Lane.create({
  laneName: "Lane 8",
  needed: 20,
  total: 50,
  degreeId: 2,
});

const lane9 = await Lane.create({
  laneName: "Lane 9",
  needed: 20,
  total: 20,
  degreeId: 3,
});

const user1 = await User.create({
  username: "user1",
  password: hashedPassword,
  fname: "Gandalf",
  lname: "The Grey",
  email: "1800@wizardsinc.com",
  school: "Timpanogos",
  currentProgress: 1,
  admin: true,
  laneId: 9,
  degreeId: 3,
});

const user2 = await User.create({
  username: "user2",
  password: hashedPassword,
  fname: "Frodo",
  lname: "Baggins",
  email: "1234@shire.com",
  school: "Orem High",
  currentProgress: 18,
  admin: false,
  laneId: 4,
  degreeId: 1,
});

const user3 = await User.create({
  username: "user3",
  password: hashedPassword,
  fname: "Thorin",
  lname: "Oakenshield",
  email: "6731@lonelymountain.com",
  school: "Oak Canyon",
  currentProgress: 17,
  admin: false,
  laneId: 8,
  degreeId: 2,
});

const user4 = await User.create({
  username: "user4",
  password: hashedPassword,
  fname: "Samwise",
  lname: "Gamgee",
  email: "9889@shire.com",
  school: "Orem High",
  currentProgress: 4,
  admin: false,
  laneId: 2,
  degreeId: 1,
});

const pdTracker1 = await PdTracker.create({
  pdProvider: "School",
  pdHours: 3,
  pdDateCompleted: new Date(),
  pdDescription: "",
  pdReflection: "",
  pdRecommend: false,
  userId: 1,
  pdId: 2,
});

const courseTracker1 = await CourseTracker.create({
  courseProvider: "USU",
  courseCredits: 3,
  courseDateCompleted: new Date(),
  courseDescription: "",
  courseReflection: "",
  courseRecommend: false,
  userId: 1,
  courseId: 2,
});

const pdTracker2 = await PdTracker.create({
  pdProvider: "School",
  pdHours: 2,
  pdDateCompleted: new Date(),
  pdDescription: "",
  pdReflection: "",
  pdRecommend: true,
  userId: 1,
  pdId: 1,
});

const courseTracker2 = await CourseTracker.create({
  courseProvider: "BSU",
  courseCredits: 4,
  courseDateCompleted: new Date(),
  courseDescription: "",
  courseReflection: "",
  courseRecommend: false,
  userId: 1,
  courseId: 1,
});

const pdTracker3 = await PdTracker.create({
  pdProvider: "State",
  pdHours: 6,
  pdDateCompleted: new Date(),
  pdDescription: "",
  pdReflection: "",
  pdRecommend: true,
  userId: 1,
  pdId: 3,
});

const courseTracker3 = await CourseTracker.create({
  courseProvider: "USU",
  courseCredits: 2,
  courseDateCompleted: new Date(),
  courseDescription: "",
  courseReflection: "",
  courseRecommend: true,
  userId: 1,
  courseId: 3,
});

console.log(pdTracker1, courseTracker1);

await db.close();
