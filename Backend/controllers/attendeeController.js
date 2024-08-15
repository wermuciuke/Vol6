import Attendee from "../models/Attendee.js";

export async function getAttendees(req, res) {
  try {
    const attendees = await Attendee.find({}, { __v: 0 });

    res.json(attendees);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function createNewAttendee(req, res) {
  const { firstName, lastName, email, age } = req.body;

  try {
    const newAttendee = new Attendee({
      firstName,
      lastName,
      email,
      age,
    });

    await newAttendee.save();

    res.json(newAttendee);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function updateAttendee(req, res) {
  const { id } = req.params;
  const { firstName, lastName, email, age } = req.body;

  try {
    const attendee = await Attendee.findById(id);

    if (!attendee) {
      res.status(404).json({ error: "Attendee doesn't exist" });
      return;
    }

    (attendee.firstName = firstName),
      (attendee.lastName = lastName),
      (attendee.email = email),
      (attendee.age = age);

    await attendee.save();

    res.json(attendee);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}

export async function deleteAttendee(req, res) {
  const { id } = req.params;

  try {
    const deletedAttendee = await Attendee.findByIdAndDelete(id);

    if (!deletedAttendee) {
      res.status(404).json({ error: "Attendee doesn't exist" });
      return;
    }

    res.json(deletedAttendee);
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
}
