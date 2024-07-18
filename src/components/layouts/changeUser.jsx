import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/MultiSelectField";
import { useParams } from "react-router-dom";
import { professions } from "../../API/fake.api/professions.api";
import API from "../../API";
const ChangeUser = ({ users }) => {
  const getUserData = (id) => {
    return users.find((user) => user._id.toString() === id);
  };
  const [profession, setProfessions] = useState(professions);
  const [qualities, setQualities] = useState();
  const { usersId } = useParams();
  const user = getUserData(usersId);
  const userCrop = getUserData(usersId);
  const [arrQual, setArrQual] = useState();
  useEffect(() => {
    API.qualities.fetchAll().then((data) => setQualities(data));
  }, []);
  console.log(profession);
  return (
    <div className="container mt-5 ">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4">
          <form>
            <TextField
              label={"Имя"}
              type={"text"}
              name={"name"}
              value={user.name}
              // onChange={handleChange}
            />
            <TextField
              label={"Электронная почта"}
              type={"text"}
              name={"email"}
              value={user.email}
              // onChange={handleChange}
            />
            <SelectField
              label={"Выбери свою профессию"}
              defaultOption={user.profession.name}
              options={profession}
              // onChange={handleChange}
              //   value={data.profession}
              name="professions"
            />
            <RadioField
              options={[
                { name: "Male", value: "male" },
                { name: "Female", value: "female" },
                { name: "Other", value: "other" },
              ]}
              value={user.sex}
              name={"sex"}
              // onChange={handleChange}
              label="Выберите ваш пол"
            />
            <MultiSelectField
              options={qualities}
              // onChange={handleChange}
              name="qualities"
              label={"Выберите ваши качества"}
              defaultValue={user.qualities.map((e)=>{return {label:e.name,value:e.name}})}
            />
            <button className="btn btn-primary w-100 mx-auto">Обновить</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeUser;
