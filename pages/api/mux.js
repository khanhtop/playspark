import Mux from "@mux/mux-node";
const { Video } = new Mux(
  "da119b92-5e00-4619-b429-e8ef5189aab2",
  "bK+wjAFkv3zuMizG8PwUBDjW487tFfvKYwIeR5tOAnR/GqFdkuJ2f5jGCE3wmI4zRsYkDdftPzc"
);

export default function handler(req, res) {
  Video.Uploads.create({
    cors_origin: "http://localhost:3000/",
    new_asset_settings: {
      playback_policy: "public",
    },
  })
    .then((upload) => {
      console.log("UP", upload);
      res.send(JSON.stringify(upload));
    })
    .catch((e) => console.log(e));
}
