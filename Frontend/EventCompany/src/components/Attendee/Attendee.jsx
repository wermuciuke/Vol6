import { useCallback } from "react";
import axios from "axios";
import PropTypes from 'prop-types'; 

const API_HOST = import.meta.env.VITE_API_HOST;

export default function Attendee({
  attendeeData,
  refetchData,
  openUpdateModal,
  quantity,
}) {
  const handleDelete = useCallback(async () => {
    const shouldDelete = window.confirm(`Are you sure? This can't be undone.`);

    if (shouldDelete) {
      try {
        await axios.delete(`${API_HOST}/attendees/${attendeeData._id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        refetchData();
      } catch (error) {
        console.error('Error deleting attendee:', error);
       
      }
    }
  }, [attendeeData._id, refetchData]);

  return (
    <tr key={attendeeData._id}>
      <td>{quantity + 1}</td>
      <td>{attendeeData.firstName}</td>
      <td>{attendeeData.lastName}</td>
      <td>{attendeeData.email}</td>
      <td>{attendeeData.age}</td>
      <td>
        <button onClick={handleDelete}>Delete</button>
      </td>
      <td>
        <button onClick={() => openUpdateModal(attendeeData)}>Update</button>
      </td>
    </tr>
  );
}

Attendee.propTypes = {
  attendeeData: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
  }).isRequired,
  refetchData: PropTypes.func.isRequired,
  openUpdateModal: PropTypes.func.isRequired,
  quantity: PropTypes.number.isRequired,
};
