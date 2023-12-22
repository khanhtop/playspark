import { useRouter } from "next/router";

export default function Terms() {
  const router = useRouter();
  const publisherName = router.query.companyName ?? "PlaySpark";
  const date = new Date();
  const dateString = date.toString();

  return (
    <div className="bg-white py-12 min-h-screen">
      <Heading>{publisherName} Terms Of Use</Heading>
      <Paragraph>
        Opt-In to Marketing Emails Terms and Conditions 1. Introduction By
        opting in to receive marketing emails from {publisherName} and its
        sponsor/advertiser, you agree to comply with and be bound by the terms
        and conditions outlined below. These terms govern your participation in
        the marketing emails program associated with the mobile game. 2. Opt-In
        Process 2.1. By selecting the opt-in checkbox within the mobile game,
        you express your consent to receive marketing emails from [Game
        Publisher] and its sponsor/advertiser. 2.2. You may opt out of receiving
        marketing emails at any time by following the unsubscribe instructions
        provided in the emails. 3. Marketing Emails Content 3.1. The marketing
        emails may include promotional content, special offers, news, updates,
        and other information related to the mobile game, {publisherName}, and
        its sponsor/advertiser. 3.2. {publisherName} and its sponsor/advertiser
        reserve the right to determine the frequency and content of the
        marketing emails. 4. Privacy and Data Usage 4.1. Your personal
        information provided during the opt-in process will be handled in
        accordance with the privacy policy of {publisherName}. Please refer to
        the privacy policy for details on how your information is collected,
        stored, and used. 4.2. {publisherName} and its sponsor/advertiser will
        not sell, rent, or lease your personal information to third parties
        without your explicit consent. 5. Unsubscribe 5.1. You have the right to
        unsubscribe from marketing emails at any time. Each marketing email will
        include an unsubscribe link that allows you to opt out of future
        communications. 5.2. Unsubscribing from marketing emails will not affect
        your access to or use of the mobile game. 6. Changes to Terms and
        Conditions 6.1. {publisherName} reserves the right to update or modify
        these terms and conditions at any time without prior notice. 6.2. Your
        continued participation in the marketing emails program after any
        changes to the terms and conditions indicates your acceptance of the
        revised terms. 7. Governing Law These terms and conditions are governed
        by and construed in accordance with the laws of Australia. Any disputes
        arising out of or in connection with these terms shall be resolved
        through negotiation and, if necessary, through the appropriate legal
        channels. By opting in to receive marketing emails, you acknowledge that
        you have read, understood, and agree to these terms and conditions.{" "}
        {publisherName} Last Updated: {dateString}
      </Paragraph>
    </div>
  );
}

function Paragraph({ children }) {
  return <p className="py-4 px-4">{children}</p>;
}

function Heading({ children }) {
  return <p className="text-2xl px-4 font-bold uppercase">{children}</p>;
}
