import { Link, useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  if (error.response) {
    if (error.response.status === 401) {
      return (
        <div
          id="main-div"
          className="flex h-screen w-screen flex-col items-center bg-blueGray"
        >
          <div
            id="content-div"
            className="my-10 flex h-[60%] w-[90%] flex-col lg:my-16"
          >
            <h1 className="text-darkGreen mb-4 text-xl font-bold">Oops!</h1>
            <h2 className="text-darkGreen mb-4 text-lg">
              You must be logged in to do that.
            </h2>
            <Link
              to="/"
              className="text-darkGreen mb-4 text-lg underline underline-offset-[4px]"
            >
              Return to Login Page
            </Link>
          </div>
        </div>
      );
    } else if (error.response.status === 403) {
      return (
        <div
          id="main-div"
          className="flex h-screen w-screen flex-col items-center bg-blueGray"
        >
          <div
            id="content-div"
            className="my-10 flex h-[60%] w-[90%] flex-col lg:my-16"
          >
            <h1 className="text-darkGreen mb-4 text-xl font-bold">Oops!</h1>
            <h2 className="text-darkGreen mb-4 text-lg">
              You must be an admin to do that.
            </h2>
            <Link
              to="/"
              className="text-darkGreen mb-4 text-lg underline underline-offset-[4px]"
            >
              Return to Dashboard
            </Link>
            <h3 className="text-darkGreen text-md">
              If you are an admin, please contact our support team for
              assistance.
            </h3>
          </div>
        </div>
      );
    }
  }

  return (
    <div
      id="main-div"
      className="flex h-screen w-screen flex-col items-center bg-blueGray"
    >
      <div
        id="content-div"
        className="my-10 flex h-[60%] w-[90%] flex-col lg:my-16"
      >
        <h1 className="text-darkGreen mb-4 text-xl font-bold">Uh-oh!</h1>
        <h2 className="text-darkGreen mb-4 text-lg">
          Sorry, an unexpected error has occured
        </h2>
        <h3 className="text-darkGreen text-md">
          <i>{error.statusText || error.message}</i>
        </h3>
      </div>
    </div>
  );
};

export default ErrorPage;
