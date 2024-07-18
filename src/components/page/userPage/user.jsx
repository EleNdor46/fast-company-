import React from "react";
import { Link, useHistory } from "react-router-dom";
const User = ({ users, usersId }, ...props) => {
  const getUsersById = (id) => {
    return users.find((user) => user._id.toString() === id);
  };
  const history = useHistory();
  const userCrop = getUsersById(usersId);

  const handleChange = () => {
    
  };
  return (
    <>
      <h1 className="m-2">{userCrop.name}</h1>
      <h2 className="m-2">{`профессия: ${userCrop.profession.name}`}</h2>
      {userCrop.qualities.map((qualitie) => {
        return (
          <span
            className={`m-2 badge bg-${qualitie.color}`}
            key={qualitie.name}
          >
            {qualitie.name}
          </span>
        );
      })}
      <h2 className="m-2">{`встреч: ${userCrop.completedMeetings}`}</h2>
      <h2 className="m-2">{`рейтинг: ${userCrop.rate}`}</h2>
      <Link to={`/users/${usersId}/change`}><button onClick={() => {handleChange()}}>Изменить</button></Link>
    </>
  );
};

export default User;
