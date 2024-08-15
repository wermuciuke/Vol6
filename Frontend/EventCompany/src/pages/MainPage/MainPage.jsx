import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Attendee from "../../components/Attendee/Attendee";
import styles from "./MainPage.module.css";
import ModalAddAttendee from "../../components/ModalAddAttendee/ModalAddAttendee";
import ModalUpdateAttendee from "../../components/ModalUpdateAttendee/ModalUpdateAttendee";

const API_HOST = import.meta.env.VITE_API_HOST;

export default function MainPage() {
  const [attendees, setAttendees] = useState([]);
  const [modalState, setModalState] = useState({ type: null, data: null });
  const navigate = useNavigate();

  // Fetch attendees from the API
  const getAttendees = useCallback(async () => {
    try {
      const response = await axios.get(`${API_HOST}/attendees`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAttendees(response.data);
    } catch (err) {
      if (err.response?.status === 403) {
        localStorage.removeItem("token");
        navigate("/");
      } else {
        alert("Something went wrong. Try again later.");
      }
    }
  }, [navigate]);

  // Toggle modals
  const toggleModal = useCallback((type = null, data = null) => {
    setModalState({ type, data });
  }, []);

  // Handle initial page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getAttendees();
    } else {
      navigate("/");
    }
  }, [navigate, getAttendees]);

  return (
    <div>
      <h1 className={styles.centerText}>List of Attendees</h1>
      {modalState.type === "add" && (
        <ModalAddAttendee
          isOpen={modalState.type === "add"}
          toggleModal={() => toggleModal(null)}
          refetchData={getAttendees}
        />
      )}
      {modalState.type === "update" && modalState.data && (
        <ModalUpdateAttendee
          isOpen={modalState.type === "update"}
          toggleModal={() => toggleModal(null)}
          refetchData={getAttendees}
          attendeeData={modalState.data}
        />
      )}
      <button className={styles.addNew} onClick={() => toggleModal("add")}>
        Add New Attendee
      </button>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {attendees.map((attendee, index) => (
            <Attendee
              key={attendee._id}
              attendeeData={attendee}
              refetchData={getAttendees}
              openUpdateModal={() => toggleModal("update", attendee)}
              quantity={index}
            />
          ))}
        </tbody>
      </table>
      <button className={styles.addNew2} onClick={() => toggleModal("add")}>
        +
      </button>
    </div>
  );
}
