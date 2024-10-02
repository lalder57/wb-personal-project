import { useLoaderData, Link } from "react-router-dom";
import Header from "../components/Header";

const ProfilePage = () => {
  const { user } = useLoaderData();
  const { username, fname, lname, school, email } = user;

  return (
    <div
      id="main-div"
      className="bg-greenGray flex h-[90vh] w-full justify-center"
    >
      <div
        id="content-div"
        className="mt-4 flex w-[90%] flex-col md:w-[80%] lg:my-10 lg:w-[70%]"
      >
        <div id="pd-title" className="flex items-center">
          <h1 className="text-xl">
            Welcome, {fname} {lname}
          </h1>
        </div>
        <div
          id="profile-details"
          className="my-10 flex flex-col justify-evenly gap-6"
        >
          <h2 className="flex items-center rounded-md bg-blueGray p-2">
            Username: {username}
          </h2>
          <h2 className="flex items-center rounded-md bg-blueGray p-2">
            First Name: {fname}
          </h2>
          <h2 className="flex items-center rounded-md bg-blueGray p-2">
            Last Name: {lname}
          </h2>
          <h2 className="flex items-center rounded-md bg-blueGray p-2">
            Email: {email}
          </h2>
          <h2 className="flex items-center rounded-md bg-blueGray p-2">
            School: {school}
          </h2>
        </div>
        <div id="second-btns" className="absolute bottom-5">
          <Link to="/userDashboard">
            <button className="text-darkGreen text-sm underline underline-offset-2 md:text-base lg:text-base">
              Return to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
