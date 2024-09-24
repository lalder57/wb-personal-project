import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  if (error.response) {
    if (error.response.status === 401) {
      return (
        <>
          <h1>Oops!</h1>
          <p>You must be logged in to do that.</p>
          <Link to="/">Click here to go back to the homepage</Link>
        </>
      );
    } else if (error.response.status === 403) {
      return (
        <>
          <h1>Oops!</h1>
          <p>You must be an admin to access this page.</p>
          <Link to="/userDashboard">Click here to go back to your dashboard</Link>
          <p>If you are an admin, please contact our support team.</p>
        </>
      )
    }
  }

  return (
    <div>
      <h1>Uh oh.</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

export default ErrorPage;