import Input from "@/components/forms/input";
import { BrandingComponent, RewardedComponent } from "../unlocksWithTier";
import Toggle from "react-toggle";
import { useAppContext } from "@/helpers/store";
import VideoPicker from "@/components/forms/videoPicker";
import SurveyInput from "@/components/forms/surveyInput";
import { useRef, useState } from "react";
import { Card, FileInput, Label, RangeSlider, TextInput } from "flowbite-react";
import NewVideoPicker from "@/components/forms/newVideoPicker";
import MuxUploader from "@/components/forms/muxUploader";

function MarketingCard({ title, cardState, onSetCardState, children, large }) {
  return (
    <Card className={`${large ? "h-auto" : "h-60"} rounded-xl`}>
      <div className="h-full flex flex-col">
        <div className="flex w-full items-center justify-between border-b-2 mb-2 pb-4 border-b-black/5">
          <Label className="text-black/100">{title}</Label>
          <Toggle
            checked={cardState}
            onClick={() => {
              onSetCardState(cardState === true ? false : true);
            }}
          />
        </div>
        <div
          style={{
            opacity: cardState ? 1 : 0.2,
            pointerEvents: cardState ? "auto" : "none",
          }}
          className="flex-1"
        >
          {children}
        </div>
      </div>
    </Card>
  );
}

export default function CreateMarketing({ tournament, setTournament }) {
  const context = useAppContext();
  const surveyId = useRef(Date.now().toString());
  const [sponsoredVideoBuffer, setSponsoredVideoBuffer] = useState(null);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        {/* Email Address Capture */}

        <MarketingCard
          title="Capture Players Email Addresses"
          cardState={!!tournament?.captureEmail}
          onSetCardState={(bool) =>
            setTournament({
              ...tournament,
              captureEmail: bool,
            })
          }
        >
          <>
            <Label className="text-black/50">Guidance Text For Players</Label>
            <TextInput
              onChange={(e) => {
                setTournament({
                  ...tournament,
                  customEmailText: e.target.value,
                });
              }}
              defaultValue={`${
                context?.profile?.companyName
                  ? context?.profile?.companyName
                  : "The sponsor"
              } would like to send you updates and information through email, would you like to be included?`}
            />
          </>
        </MarketingCard>

        {/* Shareability */}

        <MarketingCard
          title="Allow Players To Share Game"
          cardState={!!tournament?.canShare}
          onSetCardState={(bool) =>
            setTournament({
              ...tournament,
              canShare: bool,
            })
          }
        >
          <>
            <Label className="text-black/50">
              Custom URL To Share (Leave Blank For Default)
            </Label>
            <TextInput
              placeHolder="https://"
              onChange={(e) => {
                setTournament({
                  ...tournament,
                  canShareURL: e.target.value,
                });
              }}
            />
          </>
        </MarketingCard>

        {/* Social Follow */}

        <MarketingCard
          title="Encourage Users To Like / Follow Social Account"
          cardState={tournament?.socialCta !== null}
          onSetCardState={(bool) =>
            setTournament({
              ...tournament,
              socialCta: bool ? "" : null,
            })
          }
        >
          <>
            <Label className="text-black/50">Target URL</Label>
            <TextInput
              placeHolder="https://"
              onChange={(e) => {
                setTournament({
                  ...tournament,
                  socialCta: e.target.value,
                });
              }}
              value={tournament.socialCta}
            />
          </>
        </MarketingCard>

        {/* Playable Ad */}

        <MarketingCard
          title="Playable Ad"
          cardState={tournament?.playableAd}
          onSetCardState={(bool) =>
            setTournament({
              ...tournament,
              playableAd: bool,
            })
          }
        >
          <>
            <Label className="text-black/50">Win Probability</Label>
            <RangeSlider
              min={0}
              max={1}
              step={0.01}
              value={tournament?.playableAd?.winProbability}
              onChange={(e) =>
                setTournament({
                  ...tournament,
                  playableAd: {
                    winProbability: e.target.value,
                    logo: "/branding/logo.png",
                  },
                })
              }
            />
          </>
        </MarketingCard>
      </div>

      {/* Rewarded Video */}

      <MarketingCard
        large
        title="Show a Sponsored Video"
        cardState={tournament.hasSponsoredVideo}
        onSetCardState={(bool) => {
          setTournament({
            ...tournament,
            hasSponsoredVideo: bool,
            sponsoredVideo: bool === false ? null : tournament.sponsoredVideo,
          });
          setSponsoredVideoBuffer(null);
        }}
      >
        <>
          <div className="flex gap-4">
            <div className="flex-1">
              <FileInput
                accept="video/*"
                onChange={(file) =>
                  setSponsoredVideoBuffer(file.target.files[0])
                }
              />
              <MuxUploader
                file={sponsoredVideoBuffer}
                onUploadComplete={(id) =>
                  setTournament({ ...tournament, sponsoredVideo: id })
                }
              />
            </div>
            <div className="">
              {(tournament.sponsoredVideo || sponsoredVideoBuffer) && (
                <video
                  key={sponsoredVideoBuffer?.name}
                  className="h-36 rounded-lg"
                  controls
                >
                  <source
                    src={
                      tournament.sponsoredVideo
                        ? `https://stream.mux.com/${tournament.sponsoredVideo}.m3u8`
                        : URL.createObjectURL(sponsoredVideoBuffer)
                    }
                    type="video/mp4"
                  />
                </video>
              )}
            </div>
          </div>
          {tournament.sponsoredVideo && (
            <div className="pt-2">
              <Label className="text-black/50">
                Enter URL for Call To Action (Leave blank for none)
              </Label>
              <TextInput
                placeHolder="https://"
                onChange={(e) => {
                  setTournament({
                    ...tournament,
                    sponsoredVideoCtaUrl: e.target.value,
                  });
                }}
              />
            </div>
          )}

          {tournament.sponsoredVideo && (
            <div className="pt-2">
              <Label className="text-black/50">
                Odds of user being able to claim
              </Label>
              <RangeSlider
                min={0}
                max={100}
                step={0.01}
                value={tournament?.sponsoredVideoClaimPercentage || 80}
                onChange={(e) =>
                  setTournament({
                    ...tournament,
                    sponsoredVideoClaimPercentage: Math.floor(e.target.value),
                  })
                }
              />
            </div>
          )}
        </>
      </MarketingCard>

      {/* Shareability */}

      <MarketingCard
        large
        title="Show a Survey"
        cardState={!!tournament?.survey}
        onSetCardState={(bool) =>
          setTournament({
            ...tournament,
            survey:
              bool === true
                ? [
                    {
                      question: "",
                      responses: [
                        {
                          text: "",
                          correct: true,
                        },
                        {
                          text: "",
                          correct: false,
                        },
                      ],
                    },
                  ]
                : null,
          })
        }
      >
        <div className="">
          <SurveyInput
            survey={tournament.survey}
            onChange={(survey) => {
              setTournament({
                ...tournament,
                survey: survey,
                surveyId: surveyId.current,
              });
            }}
          />
        </div>
      </MarketingCard>
    </div>
  );
  return (
    <>
      {/* Rewarded Video */}
      <RewardedComponent>
        <>
          <VideoPicker
            landscape={tournament.landscape}
            video={tournament.sponsoredVideo}
            onChange={(id) => {
              setTournament({ ...tournament, sponsoredVideo: id });
            }}
          >
            <div className="mt-4">
              <Input
                labelColor="text-white/70"
                placeHolder="https://"
                label="Enter URL for Call To Action (Leave blank for none)"
                className="bg-white/5 w-full py-2 text-white mb-4"
                onChange={(url) => {
                  setTournament({
                    ...tournament,
                    sponsoredVideoCtaUrl: url.target.value,
                  });
                }}
              />
            </div>
            <div className="text-white mb-6">
              <p className="text-xs mb-2 mt-0 text-white/70">
                Percentage Until Claim (
                {tournament?.sponsoredVideoClaimPercentage || 80}%)
              </p>
              <input
                className="w-[300px] appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-cyan-400/95 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
                type="range"
                id="slider"
                min={0}
                max={100}
                step={0.01} // You can adjust the step size based on your preference
                value={tournament?.sponsoredVideoClaimPercentage || 80}
                onChange={(e) =>
                  setTournament({
                    ...tournament,
                    sponsoredVideoClaimPercentage: Math.floor(e.target.value),
                  })
                }
              />
            </div>
          </VideoPicker>
        </>
      </RewardedComponent>
      {/* Survey */}
      <RewardedComponent>
        <>
          <SurveyInput
            survey={tournament.survey}
            onChange={(survey) => {
              setTournament({
                ...tournament,
                survey: survey,
                surveyId: surveyId.current,
              });
            }}
          />
        </>
      </RewardedComponent>
      {/* Playable Ad */}
      <BrandingComponent>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mt-4">
            <p className="text-white/70">Playable Ad</p>
            <Toggle
              checked={tournament?.playableAd}
              onChange={() =>
                setTournament({
                  ...tournament,
                  playableAd: tournament?.playableAd
                    ? false
                    : {
                        winProbability: 0.5,
                        logo: "/branding/logo.png",
                      },
                })
              }
            />
          </div>
          {tournament?.playableAd && (
            <div className="text-white">
              <p className="text-xs mb-2 mt-4 text-white/70">
                Win Probability ({tournament?.playableAd?.winProbability})
              </p>
              <input
                className="w-[300px] appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-cyan-400/95 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-[20px] [&::-webkit-slider-thumb]:w-[20px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black"
                type="range"
                id="slider"
                min={0}
                max={1}
                step={0.01} // You can adjust the step size based on your preference
                value={tournament?.playableAd?.winProbability}
                onChange={(e) =>
                  setTournament({
                    ...tournament,
                    playableAd: {
                      winProbability: e.target.value,
                      logo: "/branding/logo.png",
                    },
                  })
                }
              />
            </div>
          )}
        </div>
      </BrandingComponent>
    </>
  );
}
