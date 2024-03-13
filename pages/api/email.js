import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_KEY);

export default async function handler(req, res) {
  const { email, name, url, game, customText } = req.body;

  const response = await resend.emails.send({
    // from: "challenge@playspark.co",
    from: "onboarding@resend.dev",
    to: email,
    subject: `You have been challenged by ${name}!`,
    react: ChallengeTemplate({
      challengerName: name || "Anonymous",
      customText: customText,
      url: url,
    }),
  });

  console.log(response);

  return res.status(200).json({ status: "success" });
}

export const ChallengeTemplate =
  () =>
  ({ challengerName, customText, url }) =>
    (
      <div>
        <h1>A Battle Has Begun!</h1>
        <p>{customText}</p>
        <p>
          Accept the challenge by visiting<a href={url}>{url}</a>
        </p>
      </div>
    );
