import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import PropTypes from 'prop-types';
import style from "./ModalUpdateAttendee.module.css";

const API_HOST = import.meta.env.VITE_API_HOST;

export default function ModalUpdateAttendee({
  isUpdateModalOpen,
  setIsUpdateModalOpen,
  refetchData,
  attendeeData,
}) {
  const [firstName, setFirstName] = useState(attendeeData.firstName || "");
  const [lastName, setLastName] = useState(attendeeData.lastName || "");
  const [email, setEmail] = useState(attendeeData.email || "");
  const [age, setAge] = useState(attendeeData.age || "");

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    const requestBody = {
      firstName,
      lastName,
      email,
      age,
    };

    try {
      await axios.put(
        `${API_HOST}/attendees/${attendeeData._id}`,
        requestBody,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert("Updated successfully!");
      setIsUpdateModalOpen(false); 
      refetchData();
    } catch (error) {
      alert(error.response?.data?.error || "An error occurred.");
    }
  }, [firstName, lastName, email, age, attendeeData._id, refetchData, setIsUpdateModalOpen]);

  useEffect(() => {
    document.body.style.overflow = isUpdateModalOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isUpdateModalOpen]);

  if (!isUpdateModalOpen) return null;

  return (
    <div className={style.modal} onClick={() => setIsUpdateModalOpen(false)}>
      <div className={style.overlay} />
      <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
        <h3>Update Attendee</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="inputFirstName">First Name</label>
          <br />
          <input
            id="inputFirstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <label htmlFor="inputLastName">Last Name</label>
          <br />
          <input
            id="inputLastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <label htmlFor="inputEmail">Email</label>
          <br />
          <input
            id="inputEmail"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <label htmlFor="inputAge">Age</label>
          <br />
          <input
            id="inputAge"
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min={0}
            max={120}
          />
          <br />
          <button type="submit">Update</button>
          <button type="button" onClick={() => setIsUpdateModalOpen(false)}>Cancel</button>
        </form>
      </div>
    </div>
  );
}


ModalUpdateAttendee.propTypes = {
  isUpdateModalOpen: PropTypes.bool.isRequired,
  setIsUpdateModalOpen: PropTypes.func.isRequired,
  refetchData: PropTypes.func.isRequired,
  attendeeData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  }).isRequired,
};
