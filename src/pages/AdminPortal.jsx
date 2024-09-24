import { useLoaderData } from "react-router-dom"
import UserCard from "../components/UserCard";


const AdminPortal = () => {
  const {users} = useLoaderData();

  

  const userCards = users.map((user) => {
    return (
      <UserCard 
        key={user.userId}
        user={user}
      />  
    )
  })

  return (
    <div>
      Welcome to the Admin Portal!
      {userCards}
    </div>
  )
}

export default AdminPortal
