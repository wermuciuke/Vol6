import mongoose from "mongoose";

const attendeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
});

export default mongoose.model("attendee", attendeeSchema);
