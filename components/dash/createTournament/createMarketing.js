import Input from "@/components/forms/input";
import { BrandingComponent, RewardedComponent } from "../unlocksWithTier";
import Toggle from "react-toggle";
import { useAppContext } from "@/helpers/store";
import VideoPicker from "@/components/forms/videoPicker";
import SurveyInput from "@/components/forms/surveyInput";
import { useRef } from "react";

export default function CreateMarketing({ tournament, setTournament }) {
  const context = useAppContext();
  const surveyId = useRef(Date.now().toString());
  console.log(tournament);
  return (
    <>
      {/* Email CTA */}
      <BrandingComponent>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-white/70">Capture Players Email Addresses</p>
            <Toggle
              checked={tournament?.captureEmail}
              onChange={() =>
                setTournament({
                  ...tournament,
                  captureEmail: tournament?.captureEmail ? false : true,
                })
              }
            />
          </div>
          {tournament.captureEmail && (
            <Input
              label="Guidance Text For Players"
              labelColor="text-white/70"
              className="bg-white/5 w-full py-2 text-white mb-6"
              defaultValue={`${
                context?.profile?.companyName
                  ? context?.profile?.companyName
                  : "The sponsor"
              } would like to send you updates and information through email, would you like to be included?`}
              onChange={(e) => {
                setTournament({
                  ...tournament,
                  customEmailText: e.target.value,
                });
              }}
            />
          )}
        </div>
      </BrandingComponent>
      {/* Shareability */}
      <BrandingComponent>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-white/70">Allow Players To Share Game</p>
            <Toggle
              checked={tournament?.canShare}
              onChange={() =>
                setTournament({
                  ...tournament,
                  canShare: tournament?.canShare ? false : true,
                })
              }
            />
          </div>
          {tournament.canShare && (
            <Input
              label="Custom URL To Share (Leave Blank For Default)"
              labelColor="text-white/70"
              placeHolder="https://"
              className="bg-white/5 w-full py-2 text-white mb-6"
              onChange={(e) => {
                setTournament({
                  ...tournament,
                  canShareURL: e.target.value,
                });
              }}
            />
          )}
        </div>
      </BrandingComponent>
      <BrandingComponent>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-4">
            <p className="text-white/70">
              Encourage Users To Like / Follow Social Account
            </p>
            <Toggle
              checked={tournament?.socialCta !== null}
              onChange={() =>
                setTournament({
                  ...tournament,
                  socialCta: tournament?.socialCta != null ? null : "",
                })
              }
            />
          </div>
          {tournament.socialCta !== null && (
            <Input
              label="Target URL"
              labelColor="text-white/70"
              placeHolder="https://"
              className="bg-white/5 w-full py-2 text-white mb-6"
              onChange={(e) => {
                setTournament({
                  ...tournament,
                  socialCta: e.target.value,
                });
              }}
            />
          )}
        </div>
      </BrandingComponent>
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
