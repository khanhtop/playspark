import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_KEY);

export default async function handler(req, res) {
  const { email, name, url, customText, subject, template } = req.body;

  const templates = [
    ChallengeTemplate({
      challengerName: name || "Anonymous",
      customText: customText,
      url: url,
    }),
    EndTemplate({
      customText: customText,
      image: "https://files.reimage.dev/playspark/3260ea22a28b/h-100.avif",
      subject: subject,
    }),
    EndTemplate({
      customText: customText,
      image: "https://files.reimage.dev/playspark/4ea7ce29880c/h-100.avif",
      subject: subject,
    }),
  ];

  const response = await resend.emails.send({
    from: "PlaySpark <battle@playspark.co>",
    to: email,
    subject: subject,
    react: templates[template],
  });

  console.log(response);

  return res.status(200).json({ status: "success" });
}

const ChallengeTemplate = ({ challengerName, customText, url }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <h1
      style={{ textAlign: "center" }}
      className="text-2xl font-bold text-center"
    >
      A Battle Has Begun with {challengerName}!
    </h1>
    <img
      src="https://files.reimage.dev/playspark/9f13bb5b892b/h-100.avif"
      style={{
        height: 60,
      }}
    />
    <h3>{customText}</h3>
    <h3>
      Click <a href={url}>Here</a> to accept the battle!
    </h3>
  </div>
);

const EndTemplate = ({ customText, image, subject }) => (
  <div>
    <h1>{subject}</h1>
    <img
      src={image}
      style={{
        height: 60,
      }}
    />
    <h3>{customText}</h3>
  </div>
);
