const MUX_TOKEN_ID = "da119b92-5e00-4619-b429-e8ef5189aab2";
const MUX_TOKEN_SECRET =
  "bK+wjAFkv3zuMizG8PwUBDjW487tFfvKYwIeR5tOAnR/GqFdkuJ2f5jGCE3wmI4zRsYkDdftPzc";

export default function handler(req, res) {
  const UPLOAD_ID = req.body.id;

  const url = `https://api.mux.com/video/v1/uploads/${UPLOAD_ID}`;
  const authHeader = `Basic ${Buffer.from(
    `${MUX_TOKEN_ID}:${MUX_TOKEN_SECRET}`
  ).toString("base64")}`;

  fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: authHeader,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return response.json();
    })
    .then((data) => {
      res.send(JSON.stringify(data));
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
