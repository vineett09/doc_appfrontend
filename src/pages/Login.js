import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, values);
      dispatch(hideLoading());
      if (res.data.success) {
        localStorage.setItem("token", res.data.token);
        message.success("Login successful");
        navigate("/");
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
      message.error("Something went wrong");
    }
  };

  return (
    <div className="form-container">
      <Form
        layout="vertical"
        onFinish={onFinishHandler}
        className="register-form"
      >
        <h3 className="text-center">Login form</h3>
        <Form.Item label="Email" name="email">
          <Input type="email" required />
        </Form.Item>
        <Form.Item label="Password" name="password">
          <Input type="password" required />
        </Form.Item>
        <button className="btn btn-primary" type="submit">
          Login
        </button>
        <Link to="/register" className="m-2">
          Not a user? Register here
        </Link>
      </Form>
    </div>
  );
};

export default Login;
