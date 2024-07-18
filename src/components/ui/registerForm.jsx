import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../untils/validator";
import API from "../../API";
import SelectField from "../common/form/selectField";
import RadioField from "../common/form/radioField";
import MultiSelectField from "../common/form/MultiSelectField";
import CheckBoxField from "../common/form/checkBoxField";
const RegisterForm = () => {
  const [professions, setProfessions] = useState();
  const [data, setData] = useState({
    email: "",
    password: "",
    profession: "",
    sex: "male",
    qualities: [],
    licence: false,
  });
  const [errors, setErrors] = useState({});
  const [qualities, setQualities] = useState({});
  useEffect(() => {
    API.professions.fetchAll().then((data) => setProfessions(data));
    API.qualities.fetchAll().then((data) => setQualities(data));
  }, []);

  const handleChange = (target) => {
    setData((prevState) => ({ ...prevState, [target.name]: target.value }));
  };
  useEffect(() => {
    validate();
  }, [data]);

  const validatorConfig = {
    email: {
      isRequired: { message: "Элетронная почта обязательна для заполнения" },
      isEmail: { message: "Email введен не корректно" },
    },
    password: {
      isRequired: { message: "Пароль обязателен для заполнения" },
      isCapitalSymbol: { message: "Пароль должен содержать заглавные буквы" },
      isContainDigit: { message: "Пароль должен содержать цифры" },
      min: { message: "Пароль должен быть не менее 8 символов", value: 8 },
    },
    profession: { isRequired: { message: "Поля обязательно для заполнения" } },
    licence: {
      isRequired: {
        message:
          "Вы не можете  использовать наш сервис без лицензионного подтверждения ",
      },
    },
  };

  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const isValid = Object.keys(errors).length === 0;
  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label={"Электронная почта"}
        type={"text"}
        name={"email"}
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label={"Пароль"}
        type={"password"}
        name={"password"}
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <SelectField
        label={"Выбери свою профессию"}
        defaultOption={" Choose..."}
        options={professions}
        onChange={handleChange}
        error={errors.profession}
        value={data.profession}
        name='professions'
      />
      <RadioField
        options={[
          { name: "Male", value: "male" },
          { name: "Female", value: "female" },
          { name: "Other", value: "other" },
        ]}
        value={data.sex}
        name={"sex"}
        onChange={handleChange}
        label="Выберите ваш пол"
      />
      <MultiSelectField
        options={qualities}
        onChange={handleChange}
        name="qualities"
        label={"Выберите ваши качества"}
        defaultValue={data.qualities}
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a>лицензионное соглашение</a>
      </CheckBoxField>
      <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default RegisterForm;
