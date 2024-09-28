import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);

  const getAppointments = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/user/user-appointments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (res.data.success) {
        setAppointments(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
    },
    {
      title: "Name",
      dataIndex: "doctorInfo",
      render: (text, record) => (
        <span>
          {record.doctorInfo.firstName} {record.doctorInfo.lastName}
        </span>
      ),
    },
    {
      title: "Phone No.",
      dataIndex: "phone",
      render: (text, record) => <span>{record.doctorId.phone}</span>,
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
    },
  ];
  return (
    <Layout>
      <h3 className="text-center">Your appointments</h3>
      <div className="container">
        <Table columns={columns} dataSource={appointments} />
      </div>
    </Layout>
  );
};

export default Appointments;
