import { useLoaderData, Link, useNavigate } from "react-router-dom";
import UserCard from "../components/UserCard";

const AdminPortal = () => {
  const { users } = useLoaderData();
  const navigate = useNavigate();

  const userCards = users.map((user) => {
    return <UserCard key={user.userId} user={user} />;
  });

  return (
    <div
      id="main-div"
      className="bg-greenGray flex w-full flex-col items-center lg:h-[90vh] lg:justify-start"
    >
      <div
        id="content-div"
        className="flex w-[90%] flex-col justify-between lg:h-full lg:items-center lg:justify-start lg:pt-4"
      >
        <div
          id="admin-title-div"
          className="my-5 ml-1 flex w-[99%] items-center justify-between lg:w-[95%]"
        >
          <h1 className="text-xl">Admin Portal</h1>

          <button
            onClick={() => navigate("/addPdForAll")}
            className="bg-darkGreen border-darkGreen flex h-[34px] w-[40%] min-w-[130px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
          >
            + School-Wide PD
          </button>
        </div>
        <div id="user-card-div" className="">
          {userCards}
        </div>
      </div>
    </div>
  );
};

export default AdminPortal;
