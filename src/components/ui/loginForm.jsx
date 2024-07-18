import React, { useEffect, useState } from "react";
import TextField from "../common/form/textField";
import { validator } from "../../untils/validator";
import CheckBoxField from "../common/form/checkBoxField";
import * as yup from "yup";
const LoginForm = () => {
  const [data, setData] = useState({ email: "", password: "", stayOn: false });
  const [errors, setErrors] = useState({});
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
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      <button className="btn btn-primary w-100 mx-auto" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
