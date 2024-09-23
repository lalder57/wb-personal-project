import { useLoaderData, Link } from "react-router-dom"
import Header from "../components/Header";

const ProfilePage = () => {
  const { user } = useLoaderData();
  const { username, password, fname, lname, district, email } = user;

  return (
    <div>
      <Header />
      <h1>Welcome, {fname} {lname}</h1>
      <h2>username: {username}</h2>
      <h2>email: {email}</h2>
      <h2>school district: {district}</h2>

      <Link to={'/userDashboard'}>
        <button>Return to Dashboard</button>
      </Link>
      
    </div>
  )
}

export default ProfilePage
