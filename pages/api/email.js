import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_KEY);

export default async function handler(req, res) {
  const { email, name, url, game } = req.body;

  console.log(email, name, url, game);
  const challengeUrl = `https://playspark.co/challenge/${game.tournamentId}`;
  console.log(challengeUrl);

  //   const response = await resend.emails.send({
  //     // from: "challenge@playspark.co",
  //     from: "onboarding@resend.dev",
  //     to: email,
  //     subject: `You have been challenged by ${name}!`,
  //     react: ChallengeTemplate({ challengerName: name || "Anonymous" }),
  //   });

  //   console.log(response);

  return res.status(200).json({ status: "success" });
}

export const ChallengeTemplate =
  () =>
  ({ challengerName }) =>
    (
      <div>
        <h1>You Have Been Challenged By {challengerName}!</h1>
        <p>{challengerName} has invited you to play</p>
      </div>
    );
