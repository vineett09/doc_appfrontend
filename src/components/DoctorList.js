import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LayoutStyles.css";
const BASE_URL = process.env.REACT_APP_BASE_URL;
const DoctorList = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <>
      <div
        className="doctor card m-2"
        style={{ cursor: "pointer" }}
        onClick={() =>
          navigate(`${BASE_URL}/doctor/book-appointment/${doctor._id}`)
        }
      >
        <div className="card-header">
          Dr. {doctor.firstName} {doctor.lastName}
        </div>
        <div className="card-body">
          <p>
            <b>Specialization - {doctor.specialization}</b>
          </p>
          <p>
            <b>Experience - {doctor.experience}</b>
          </p>
          <p>
            <b>Fees per consultation - {doctor.feesPerConsultation}</b>
          </p>
          <p>
            <b>
              Timings - {doctor.timings[0]} - {doctor.timings[1]}
            </b>
          </p>
          <p>
            <b>Address - {doctor.address}</b>
          </p>
          <p>
            <b>Phone No. - {doctor.phone}</b>
          </p>
        </div>
      </div>
    </>
  );
};

export default DoctorList;
