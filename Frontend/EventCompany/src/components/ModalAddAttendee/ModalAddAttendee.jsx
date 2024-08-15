import axios from "axios";
import { useEffect, useState } from "react";
import style from "./ModalAddAttendee.module.css";

const API_HOST = import.meta.env.VITE_API_HOST;

export default function ModalAddAttendee({
  // eslint-disable-next-line react/prop-types
  isAddModalOpen,
  // eslint-disable-next-line react/prop-types
  setIsAddModalOpen,
  // eslint-disable-next-line react/prop-types
  toggleAddModal,
  // eslint-disable-next-line react/prop-types
  refetchData,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    const requestBody = {
      firstName,
      lastName,
      email,
      age,
    };

    try {
      await axios.post(`${API_HOST}/attendees`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setAge("");

      alert("Attendee added successfully!");
      setIsAddModalOpen(!isAddModalOpen);
    } catch (error) {
      alert(error.response.data.error);
    }
    refetchData();
  }

  useEffect(() => {
    if (isAddModalOpen) {
      if (isAddModalOpen) {
        document.body.style.overflow = isAddModalOpen ? "hidden" : "auto";
        return () => {
          document.body.style.overflow = "auto";
        };
      }
    }
  }, [isAddModalOpen]);

  return (
    <div>
      {isAddModalOpen && (
        <div className={style.modal}>
          <div className={style.overlay} onClick={toggleAddModal}></div>
          <div className={style.modalContent}>
            <h3>Add New Attendee</h3>
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
                type="text"
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
              <button type="submit">Add</button>
              <button onClick={toggleAddModal}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
