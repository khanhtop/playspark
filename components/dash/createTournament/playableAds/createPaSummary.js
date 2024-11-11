import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";
import { Card } from "flowbite-react";
import CreatePaPreview from "./createPaPreview";

export default function CreatePaSummary({ tournament, setTournament }) {
  return (
    <div className="flex gap-4">
      <div className="text-black flex flex-col gap-2 flex-1">
        <Card>
          <TextSummary title="Game Name" text={tournament.name} />
          {/* <TextSummary title="Game Description" text={tournament.description} /> */}
          <ColorSummary title="Primary Color" hex={tournament.primaryColor} />
          <ColorSummary title="Accent Color" hex={tournament.accentColor} />
          <ColorSummary title="Text Color" hex={tournament.textColor} />
          <TextSummary
            title="Difficulty"
            text={`${(tournament.winProbability * 100).toFixed(0)}%`}
          />
          <TextSummary title="Rewards" text={tournament.rewards?.length || 0} />
          {/* <CheckedSummary
            title="Sponsored Video"
            checked={tournament.sponsoredVideo}
          />
          <CheckedSummary
            title="Email Capture"
            checked={tournament.captureEmail}
          />
          <CheckedSummary title="User Sharing" checked={tournament.canShare} />
          <CheckedSummary
            title="Playable Ads"
            checked={tournament.playableAd}
          />
          <CheckedSummary title="Survey" checked={tournament.survey} /> */}
        </Card>
      </div>
      <CreatePaPreview tournament={tournament} />
    </div>
  );
}

function SummaryItem({ left, right }) {
  return (
    <div className="flex gap-2">
      <div className="min-w-[180px]">{left}</div>
      <div className="text-black/70">{right}</div>
    </div>
  );
}

function TextSummary({ title, text }) {
  return (
    <SummaryItem
      left={<p className="font-bold">{title}:</p>}
      right={<p>{text}</p>}
    />
  );
}

function CheckedSummary({ title, checked }) {
  return (
    <SummaryItem
      left={<p className="font-bold">{title}:</p>}
      right={
        checked ? (
          <CheckCircleIcon className="-ml-[2px] h-6 w-6 text-green-400" />
        ) : (
          <XCircleIcon className="-ml-[2px] h-6 w-6 text-red-400" />
        )
      }
    />
  );
}

function ColorSummary({ title, hex }) {
  return (
    <SummaryItem
      left={<p className="font-bold">{title}:</p>}
      right={
        <div
          className="w-5 h-5 rounded-full mt-[2px] border-[1px]"
          style={{ backgroundColor: hex }}
        />
      }
    />
  );
}
