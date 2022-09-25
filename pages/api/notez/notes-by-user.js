import { connectToDatabase } from "../../../lib/dbconnect";
export default async (req, res) => {
  const { db } = await connectToDatabase();
  const notes = await db
    .collection("notes")
    .find({ createdById: req.body.createdById })
    .toArray();
  res.status(200).json(notes);
};
