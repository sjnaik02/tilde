import { connectToDatabase } from "../../../lib/dbconnect";

//fetch note by noteID
export default async function handler(req, res) {
  const noteId = req.query.noteId;
  const note = await getNoteById(noteId);
  res.status(200).json(note);
}

//get note by id
async function getNoteById(noteId) {
  try {
    // connect to the database
    let { db } = await connectToDatabase();
    // fetch the posts
    let note = await db.collection("notes").findOne({ noteId: noteId });

    // return the posts
    return JSON.parse(JSON.stringify(note));
  } catch (error) {
    // return the error
    return new Error(error).message;
  }
}
