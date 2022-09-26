//send 20 random notes to the client which are not private
export default function handler(req, res) {
  res.status(200).json({ message: "Big notez" });
}
