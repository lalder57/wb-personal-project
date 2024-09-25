import { React, StrictMode } from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import LandingPage from "./pages/LandingPage.jsx";
import UserDashboard from "./pages/UserDashboard.jsx";
import AddPd from "./pages/AddPd.jsx";
import AddCourse from "./pages/AddCourse.jsx";
import axios from "axios";
import PdDetailPage from "./pages/PdDetailPage.jsx";
import CourseDetailPage from "./pages/CourseDetailPage.jsx";
import ErrorPage from "./pages/ErrorPage.jsx";
import UpdateDegreeForm from "./components/UpdateDegreeForm.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import CreateCoursePage from "./pages/CreateCoursePage.jsx";
import CreatePdPage from "./pages/CreatePdPage.jsx";
import MyCoursesPage from "./pages/MyCoursesPage.jsx";
import MyPdsPage from "./pages/MyPdsPage.jsx";
import AdminPortal from "./pages/AdminPortal.jsx";
import AddSchoolWidePd from "./components/AddSchooWidePd.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<LandingPage />} />
      <Route
        path="userDashboard"
        element={<UserDashboard />}
        loader={async () => {
          const res = await axios.get("/api/userInfo");
          return {
            fname: res.data.fname,
            userPds: res.data.userPds,
            userCourses: res.data.userCourses,
            userId: res.data.userId,
            userAdmin: res.data.userAdmin,
            userCurrentProgress: res.data.userCurrentProgress,
            userLane: res.data.userLane,
            userDegree: res.data.userDegree,
          };
        }}
      />
      <Route
        path="addPd"
        element={<AddPd />}
        loader={async () => {
          const res = await axios.get("/api/pds");
          return { allPds: res.data.allPds };
        }}
      />
      <Route
        path="addCourse"
        element={<AddCourse />}
        loader={async () => {
          const res = await axios.get("/api/courses");
          return { allCourses: res.data.allCourses };
        }}
      />
      <Route
        path="pdTrackers/:id"
        element={<PdDetailPage />}
        // loader to get a specific pdTracker's details
        loader={async ({ params }) => {
          const { id } = params;

          const res = await axios.get(`/api/pdTrackers/${id}`);
          return { pdDetails: res.data.pdDetails };
        }}
      />
      <Route
        path="courseTrackers/:id"
        element={<CourseDetailPage />}
        //loader to get a specific course's details
        loader={async ({ params }) => {
          const { id } = params;

          const res = await axios.get(`/api/courseTrackers/${id}`);
          return { courseDetails: res.data.courseDetails };
        }}
      />
      <Route path="updateDegree" element={<UpdateDegreeForm />} />
      <Route
        path="myProfile"
        element={<ProfilePage />}
        loader={async () => {
          const res = await axios.get("/api/getProfileInfo");
          return { user: res.data.user };
        }}
      />
      <Route path="createCoursePage" element={<CreateCoursePage />} />
      <Route path="createPdPage" element={<CreatePdPage />} />
      <Route 
        path="myCourses"
        element={<MyCoursesPage />}
        loader={async () => {
          const res = await axios.get("/api/getUserCourses");
          return {  userCourses: res.data.userCourses };
        }}
      />
      <Route 
        path="myPds"
        element={<MyPdsPage />}
        loader={async () => {
          const res = await axios.get("/api/getUserPds");
          return {  userPds: res.data.userPds };
        }}
      />
      <Route 
        path="adminPortal"
        element={<AdminPortal />}
        loader={async () => {
          const res = await axios.get("/api/adminPortal");
          return { users: res.data.users };
        }}
      />
      <Route 
        path="addPdForAll"
        element={<AddSchoolWidePd />}
      />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
