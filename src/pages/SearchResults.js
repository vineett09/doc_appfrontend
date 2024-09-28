import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const SearchResults = () => {
  const [doctors, setDoctors] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      const params = new URLSearchParams(location.search);
      const specialization = params.get("specialization");
      const response = await fetch(
        `${BASE_URL}/api/v1/search?specialization=${specialization}`
      );
      const data = await response.json();
      setDoctors(data);
    };

    fetchDoctors();
  }, [location.search]);

  return (
    <Layout>
      <h2 className="text-center">Search Results</h2>
      <div className="row">
        {doctors.length > 0 ? (
          doctors.map((doctor) => (
            <div className="col-md-4" key={doctor._id}>
              <div
                className="doctor card m-2"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/doctor/book-appointment/${doctor._id}`)
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
                    <b>Experience - {doctor.experience} years</b>
                  </p>
                  <p>
                    <b>Fees per consultation - ₹{doctor.feesPerConsultation}</b>
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
            </div>
          ))
        ) : (
          <div className="col-12">
            <h4 className="text-center">Sorry No results found</h4>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchResults;
