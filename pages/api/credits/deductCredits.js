export default async function handler(req, res) {
  const { data } = req.body;
  return res.status(200).json({ status: "success" });
}
