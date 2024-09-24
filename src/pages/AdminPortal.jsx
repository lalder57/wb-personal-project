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
    <div className="h-full w-full flex flex-col">
      Welcome to the Admin Portal!
      <div className="h-full w-full flex flex-row">
      {userCards}
      </div>
    </div>
  )
}

export default AdminPortal
