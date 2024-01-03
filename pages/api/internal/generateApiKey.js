const { randomBytes } = require("crypto");

export default async function handler(req, res) {
  const key = randomBytes(32).toString("hex");
  return res.status(200).json({ status: "success", message: key });
}
