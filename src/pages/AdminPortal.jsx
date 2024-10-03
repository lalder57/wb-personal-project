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
      className="bg-greenGray flex w-full flex-col items-center lg:mb-56 lg:justify-start"
    >
      <div
        id="content-div"
        className="flex w-[90%] flex-col justify-between md:w-[80%] md:pt-6 lg:h-full lg:w-[70%] lg:items-center lg:justify-start"
      >
        <div
          id="admin-title-div"
          className="my-5 ml-1 flex w-[99%] items-center justify-between lg:w-full lg:justify-start lg:gap-12"
        >
          <h1 className="text-xl">Admin Portal</h1>

          <button
            onClick={() => navigate("/addPdForAll")}
            className="bg-darkGreen border-darkGreen flex h-[34px] w-[40%] min-w-[130px] max-w-[175px] items-center justify-center rounded-lg text-sm font-semibold text-white md:text-base lg:text-base"
          >
            + School-Wide PD
          </button>
        </div>

        <div
          id="user-card-div"
          className="lg:mt-10 lg:flex lg:w-full lg:flex-wrap lg:gap-10"
        >
          {userCards}
        </div>
        {/* </div> */}
      </div>
    </div>
  );
};

export default AdminPortal;
