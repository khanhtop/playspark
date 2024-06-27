import { firestore } from "@/helpers/firebase";
import { useAppContext } from "@/helpers/store";

export default function LegalModal({ data }) {
  const context = useAppContext();

  const { endDate } = data;
  let formattedDate = null;
  let formattedTime = null;

  if (endDate) {
    const endDateObj = JSON.parse(endDate);
    const { seconds, nanoseconds } = endDateObj;
    const dateInMilliseconds =
      seconds * 1000 + Math.floor(nanoseconds / 1000000);
    const endDateFormatted = new Date(dateInMilliseconds);
    const day = endDateFormatted.getDate();
    const month = endDateFormatted.toLocaleString("en-US", { month: "long" });
    const year = endDateFormatted.getFullYear();

    const ordinalSuffix = (num) => {
      if (num === 1 || num === 21 || num === 31) return "st";
      if (num === 2 || num === 22) return "nd";
      if (num === 3 || num === 23) return "rd";
      return "th";
    };

    formattedDate = `${day}${ordinalSuffix(day)} ${month} ${year}`;
    const hours = endDateFormatted.getHours();
    const minutes = endDateFormatted.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 === 0 ? 12 : hours % 12; // Convert 24-hour to 12-hour format
    const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

    formattedTime = `${formattedHours}:${formattedMinutes}${ampm}`;
  }

  if (data.isTermsOfUse) {
    return (
      <div className="pt-12 pb-4 px-6 flex flex-col gap-4 h-full text-black overflow-y-scroll py-8">
        <h3>Contest Rules</h3>
        <NumericalBlock number={1} title="ENTRY PERIOD">
          <TextBlock>
            The competition will{" "}
            {formattedDate
              ? `end on ${formattedDate} at ${formattedTime}`
              : "run indefinitely"}
          </TextBlock>
        </NumericalBlock>
        <NumericalBlock number={2} title="HOW TO ENTER">
          <Bullets
            bullets={[
              `Open the ${data.name} in the relevant browser or app.`,
              "Register with your valid email address.",
              "Participate in the contest during the entry period.",
            ]}
          />
        </NumericalBlock>
        <NumericalBlock number={3} title="GAMEPLAY REQUIREMENTS">
          <Bullets
            bullets={[
              `Participants must achieve specific in-game objectives to be awarded prizes.`,
              "All entries must be submitted through the mobile game site or app.",
            ]}
          />
        </NumericalBlock>
        <NumericalBlock number={4} title="DISQUALIFICATION">
          <TextBlock>
            Any form of cheating, hacking, or violation of game rules will
            result in disqualification from the contest.
          </TextBlock>
        </NumericalBlock>
        <NumericalBlock number={5} title="PRIZES">
          <NumericalBlock lightFont number={5.1} title="Prize Structure">
            {data?.rewards?.length > 0 ? (
              <Bullets
                bullets={data?.rewards?.map(
                  (item) =>
                    `${item.name} for ${item.input} of ${item.inputValue}`
                )}
              />
            ) : (
              <Bullets bullets={["There are no prizes in this tournament."]} />
            )}
          </NumericalBlock>
          {data?.rewards?.length > 0 && (
            <NumericalBlock lightFont number={5.2} title="Prize Details">
              <Bullets
                bullets={[
                  "Prizes are non-transferable and cannot be exchanged for cash or other items.",
                  "The organizer reserves the right to substitute any prize with another of equivalent value without giving notice.",
                ]}
              />
            </NumericalBlock>
          )}
        </NumericalBlock>
        <NumericalBlock number={6} title="WINNER SELECTION AND NOTIFICATION">
          <TextBlock>
            Winner Selection: Winners will be determined based on achievement
            criteria as set out in Section 5.1. Winners will be selected via the
            PlaySpark platform on{" "}
            {formattedDate ? formattedDate : "a date in the future"}.
          </TextBlock>
          <TextBlock>
            Notification: Winners will be notified via email and/or SMS within 7
            days after the contest end date.
          </TextBlock>
          <TextBlock>
            Prize Claim: Winners must respond within 28 days to claim their
            prize. Failure to respond within this time frame will result in
            forfeiture of the prize.
          </TextBlock>
          <TextBlock>
            Verification: Winners may be required to provide proof of identity
            and eligibility.
          </TextBlock>
        </NumericalBlock>
      </div>
    );
  }
  return (
    <div className="pt-12 pb-4 px-4 flex flex-col gap-4 h-full">
      <iframe
        src={data.url}
        width="100%"
        height="100%"
        allow="autoplay"
        className="rounded-lg"
      ></iframe>
    </div>
  );
}

function NumericalBlock({ number, title, children, lightFont }) {
  return (
    <div className="flex flex-col gap-2 mb-2">
      <div
        className={`${
          lightFont ? "font-semibold text-black/80" : "font-bold"
        } flex gap-3`}
      >
        <p>{number}.</p>
        <p>{title}</p>
      </div>
      {children}
    </div>
  );
}

function TextBlock({ children }) {
  return <div className="text-black font-light">{children}</div>;
}

function Bullets({ bullets }) {
  return (
    <ul className="text-black font-light flex flex-col gap-1">
      {bullets.map((item, key) => (
        <div key={key} className="flex gap-2">
          <div className="h-2 w-2 mt-2 bg-black rounded-full flex-shrink-0" />
          <li>{item}</li>
        </div>
      ))}
    </ul>
  );
}
