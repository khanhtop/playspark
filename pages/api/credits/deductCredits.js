export default async function handler(req, res) {
  const { data } = req.body;
  console.log(data);
  return res.status(200).json({ status: "success" });
}
