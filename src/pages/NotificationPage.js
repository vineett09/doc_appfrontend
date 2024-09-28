import React from "react";
import Layout from "./../components/Layout";
import { message, Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import moment from "moment";
import "../styles/LayoutStyles.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const NotificationPage = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  const handleMarkAllRead = async () => {
    if (!user) {
      message.error("User not found");
      return;
    }
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${BASE_URL}/api/v1/user/get-all-notification`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error marking all notifications as read:", error);
      message.error("Something went wrong");
    }
  };

  const handleDeleteAllRead = async () => {
    if (!user) {
      message.error("User not found");
      return;
    }
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `${BASE_URL}/api/v1/user/delete-all-notification`,
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      } else {
        message.error(res.data.error);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.error("Error deleting all notifications:", error);
      message.error("Something went wrong in notifications");
    }
  };

  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page</h4>
      <div className="container">
        <Tabs>
          <Tabs.TabPane tab="Unread" key={0}>
            <div className="d-flex justify-content-end">
              <h5
                className="p-2 text-primary"
                style={{ cursor: "pointer" }}
                onClick={handleMarkAllRead}
              >
                Mark all as read
              </h5>
            </div>
            {user?.notification.map((notificationMsg) => (
              <div className=" notification card m-2" key={notificationMsg._id}>
                <div
                  className="card border-info p-2"
                  style={{ cursor: "pointer" }}
                >
                  <p>{notificationMsg.message}</p>
                  <p className="text-muted">
                    {moment(notificationMsg.timestamp).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </p>
                </div>
              </div>
            ))}
          </Tabs.TabPane>
          <Tabs.TabPane tab="Read" key={1}>
            <div className="d-flex justify-content-end">
              <h5
                className="p-2 text-primary"
                style={{ cursor: "pointer" }}
                onClick={handleDeleteAllRead}
              >
                Delete all notifications
              </h5>
            </div>
            {user?.seennotification.map((notificationMsg) => (
              <div className=" notification card m-2" key={notificationMsg._id}>
                <div
                  className="card border-info ps-2"
                  style={{ cursor: "pointer" }}
                >
                  <p>{notificationMsg.message}</p>
                  <p className="text-muted">
                    {moment(notificationMsg.timestamp).format(
                      "MMMM Do YYYY, h:mm:ss a"
                    )}
                  </p>
                </div>
              </div>
            ))}
          </Tabs.TabPane>
        </Tabs>
      </div>
    </Layout>
  );
};

export default NotificationPage;
