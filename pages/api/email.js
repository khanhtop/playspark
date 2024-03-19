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
  <div>
    <h1>A Battle Has Begun with {challengerName}!</h1>
    <p>{customText}</p>
    <p>
      Accept the challenge by visiting <a href={url}>{url}</a>
    </p>
  </div>
);

const EndTemplate = ({ customText }) => (
  <div>
    <h1>The battle has ended!</h1>
    <p>{customText}</p>
  </div>
);
