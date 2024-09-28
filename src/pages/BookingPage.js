import React, { useState, useEffect, useCallback } from "react";
import Layout from "./../components/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker, message } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/features/alertSlice";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const BookingPage = () => {
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const [doctors, setDoctors] = useState([]);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const dispatch = useDispatch();

  //login user data
  const getUserData = useCallback(async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/api/v1/doctor/getDoctorById`,
        { doctorId: params.doctorId },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [params.doctorId]);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  //booking-appointment
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert("Date and time required");
      }
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/book-appointment",
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctors,
          date: date,
          userInfo: user,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  //Booking availability
  const handleAvailability = async () => {
    try {
      if (!date && !time) {
        return alert("Date and time required");
      }
      dispatch(showLoading());

      const res = await axios.post(
        "/api/v1/user/check-availability",
        { doctorId: params.doctorId, date, time },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      console.log(error);
    }
  };

  return (
    <Layout>
      <h3 className="text-center p-3">Booking page</h3>
      <div className="container m-2">
        {doctors && (
          <div>
            <h5>
              Dr. {doctors.firstName} {doctors.lastName}
            </h5>
            <h5>Fees: {doctors.feesPerConsultation}</h5>
            {/*<h5>
              Timings: {doctors.timings[0]} - {doctors.timings[1]}
            </h5>*/}
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setIsAvailable(false);
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={(value) => {
                  setIsAvailable(false);
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button
                className="btn btn-primary mt-2 "
                onClick={handleAvailability}
              >
                Check availability
              </button>
              {!isAvailable && (
                <button className="btn btn-dark mt-2" onClick={handleBooking}>
                  Book Now
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
