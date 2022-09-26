import { connectToDatabase } from "../../../lib/dbconnect";

export default async function handler(req, res) {
  const noteId = req.query.noteId;
  if (req.method === "GET") {
    const { db } = await connectToDatabase();
    const note = await db
      .collection("notes")
      .findOne({ noteId: req.query.noteId });
    res.status(200).json(note);
  } else if (req.method === "PUT") {
    const { db } = await connectToDatabase();
    const note = await db.collection("notes").updateOne(
      { noteId: req.query.noteId },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          private: req.body.private,
        },
      }
    );
    res.status(200).json(note);
  } else if (req.method === "DELETE") {
    const { db } = await connectToDatabase();
    const note = await db
      .collection("notes")
      .findOne({ noteId: req.query.noteId });
    if (note) {
      const deletedNote = await db
        .collection("notes")
        .deleteOne({ noteId: req.query.noteId });
      res.status(200).json(deletedNote);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
  }
}
