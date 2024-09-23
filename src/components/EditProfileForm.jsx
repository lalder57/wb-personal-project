import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const EditProfileForm = ({toggleEdit, newUserInfo, setNewUserInfo}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("");

  const handleEditProfile = async (e) => {
    e.preventDefault();
    const updatedUserInfo = {
      username,
      email,
      district,
    }
  }

  return (
    <div>
      
    </div>
  )
}

export default EditProfileForm
