import ImagePicker from "@/components/forms/imagePicker";
import Input from "@/components/forms/input";
import UIButton from "@/components/ui/button";
import Text from "@/components/ui/text";
import {
  PlusCircleIcon,
  XCircleIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import WebhookRewardsTestButton from "./webhookRewardTestButton";
import {
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  Label,
  TextInput,
} from "flowbite-react";
import ReimagePicker from "@/components/reimage/reimagePicker";

const inputs = [
  {
    text: "Score",
    value: "score",
  },
  {
    text: "XP",
    value: "xp",
  },
  {
    text: "Level",
    value: "level",
  },
  {
    text: "Game End Rank",
    value: "rank",
  },
  {
    text: "Game End XP",
    value: "endxp",
  },
];

const operands = [
  {
    text: "=",
    value: "==",
  },
  {
    text: ">=",
    value: ">=",
  },
  {
    text: ">",
    value: ">",
  },
];

const outputOperands = [
  {
    text: "XP",
    value: "xp",
  },
  {
    text: "Coins",
    value: "coins",
  },
  {
    text: "Promo Code",
    value: "promocode",
  },
  {
    text: "Physical Item",
    value: "physical",
  },
  {
    text: "HTTPS Webhook",
    value: "webhook",
  },
];

export default function CreateRewards({ tournament, setTournament }) {
  return (
    <div className="text-white flex flex-col gap-2 w-full items-start">
      {tournament?.rewards?.map((item, key) => (
        <RewardRow
          item={item}
          key={key}
          index={key}
          onDelete={() => {
            let rewards = [...tournament.rewards];
            rewards.splice(key, 1);
            setTournament({
              ...tournament,
              rewards: rewards || null,
            });
          }}
          onChange={(e) => {
            let rewards = [...tournament.rewards];
            rewards[key] = e;
            setTournament({
              ...tournament,
              rewards: rewards,
            });
          }}
        />
      ))}
      <Button
        onClick={() =>
          setTournament({
            ...tournament,
            rewards: [
              ...(tournament?.rewards ?? []),
              {
                name: "New Reward",
                id: Date.now().toString(),
                description: "My awesome reward",
                image: null,
                input: "score",
                inputOperand: "==",
                inputValue: 10,
                outputAction: "xp",
                outputValue: 100,
                outputLocation: null,
                outputInstructions: null,
              },
            ],
          })
        }
        className="bg-indigo-600 enabled:hover:bg-indigo-600"
      >
        {/* <PlusCircleIcon className="h-6 w-6" /> */}
        Add Reward
      </Button>
    </div>
  );
}

function RewardRow({ item, onChange, onDelete, index }) {
  return (
    <Card className="w-full rounded-lg relative text-black">
      <div className="mb-4 text-sm font-bold flex gap-4 items-center h-6 ">
        <div className="bg-indigo-600 text-white rounded-full flex h-full  px-3 items-center justify-center">
          Reward #{index + 1}
        </div>
        <p>
          ID: <span>{item.id}</span>
        </p>
      </div>

      <div className="flex gap-4 mb-0 pr-0">
        <ReimagePicker
          file={item.image}
          setFile={(e) => onChange({ ...item, image: e })}
          aspectRatio={1}
        />
        {/* <ImagePicker
          cover
          id={`rwd-img-${index}`}
          width={112}
          height={112}
          label="Reward Image"
          image={item.image}
          onChange={(e) => onChange({ ...item, image: e })}
        /> */}
        <div className="flex flex-col flex-1 gap-2">
          <div>
            <Label className="text-black/50">Reward Name</Label>
            <TextInput
              color="light"
              placeHolder={item?.name}
              value={item?.name}
              onChange={(e) => onChange({ ...item, name: e.target.value })}
            />
          </div>
          <div>
            <Label className="text-black/50">Reward Description</Label>
            <TextInput
              color="light"
              placeHolder={item?.description}
              value={item?.description}
              onChange={(e) =>
                onChange({ ...item, description: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="flex gap-2">
        <LabelledSelect
          label="Input"
          value={item.input}
          onChange={(e) => onChange({ ...item, input: e })}
          options={inputs}
          className="flex-1"
        />
        <LabelledSelect
          label="Condition"
          value={item.inputOperand}
          onChange={(e) => onChange({ ...item, inputOperand: e })}
          options={operands}
          className="flex-1"
        />
        <div>
          <Label className="text-black/50">Value</Label>
          <TextInput
            color="light"
            placeHolder="Value"
            value={item?.inputValue}
            onChange={(e) =>
              onChange({ ...item, inputValue: parseInt(e.target.value) })
            }
          />
        </div>
        {/* <Input
          label="Value"
          type="number"
          className="bg-white/5 w-full py-2 text-white"
          placeHolder="Value"
          value={item?.inputValue}
          labelColor="text-white/70"
          onChange={(e) =>
            onChange({ ...item, inputValue: parseInt(e.target.value) })
          }
        /> */}
      </div>
      <div className="flex gap-2 mt-0">
        {/* <LabelledSelect
          label="Output"
          value={item.output}
          onChange={(e) => onChange({ ...item, output: e })}
          options={outputs}
          className="flex-1"
        /> */}
        <LabelledSelect
          label="Action"
          value={item.outputAction}
          onChange={(e) => onChange({ ...item, outputAction: e })}
          options={outputOperands}
          className="flex-1"
        />
        <WebhookRewardsTestButton rewards={item} />
        <div>
          <Label className="text-black/50">
            {item.outputAction === "xp" || item.outputAction === "coins"
              ? "Amount"
              : item.outputAction === "promocode"
              ? "Code"
              : item.outputAction === "webhook"
              ? "Webhook URL"
              : "Item Name"}
          </Label>
          <TextInput
            color="light"
            type={
              item.outputAction !== "xp" && item.outputAction !== "number"
                ? "text"
                : "number"
            }
            placeHolder="Value"
            value={item?.outputValue}
            onChange={(e) =>
              onChange({
                ...item,
                outputValue:
                  item.outputAction !== "xp" && item.outputAction !== "coins"
                    ? e.target.value
                    : parseInt(e.target.value),
              })
            }
          />
        </div>
        {/* <Input
          label={
            item.outputAction === "xp" || item.outputAction === "coins"
              ? "Amount"
              : item.outputAction === "promocode"
              ? "Code"
              : item.outputAction === "webhook"
              ? "Webhook URL"
              : "Item Name"
          }
          type={
            item.outputAction !== "xp" && item.outputAction !== "number"
              ? "text"
              : "number"
          }
          className="bg-white/5 w-full py-2 text-white"
          placeHolder="Value"
          value={item?.outputValue}
          labelColor="text-white/70"
          onChange={(e) =>
            onChange({
              ...item,
              outputValue:
                item.outputAction !== "xp" && item.outputAction !== "coins"
                  ? e.target.value
                  : parseInt(e.target.value),
            })
          }
        /> */}
      </div>
      {(item.outputAction === "physical" ||
        item.outputAction === "promocode" ||
        item.outputAction === "webhook") && (
        <div className="mt-0">
          <div>
            <Label className="text-black/50">Redemption Instructions</Label>
            <TextInput
              color="light"
              placeHolder="Instructions for a user to redeem the reward"
              value={item?.outputInstructions}
              onChange={(e) =>
                onChange({
                  ...item,
                  outputInstructions: parseInt(e.target.value),
                })
              }
            />
          </div>
          {/* <Input
            label="Redemption Instructions"
            className="bg-white/5 w-full py-2 text-white"
            placeHolder="Instructions for a user to redeem the reward"
            value={item?.outputInstructions}
            labelColor="text-white/70"
            onChange={(e) =>
              onChange({
                ...item,
                outputInstructions: e.target.value,
              })
            }
          /> */}
        </div>
      )}
      {(item.outputAction === "physical" ||
        item.outputAction === "promocode") && (
        <div className="mt-0">
          <div>
            <Label className="text-black/50">
              {item.outputAction === "physical"
                ? "Location or Redemption Address"
                : "Redemption URL"}
            </Label>
            <TextInput
              color="light"
              placeHolder={
                item.outputAction === "physical"
                  ? "101 King Street, Sydney"
                  : "https://"
              }
              value={item?.outputLocation}
              onChange={(e) =>
                onChange({
                  ...item,
                  outputLocation: parseInt(e.target.value),
                })
              }
            />
          </div>
          {/* <Input
            label={
              item.outputAction === "physical"
                ? "Location or Redemption Address"
                : "Redemption URL"
            }
            className="bg-white/5 w-full py-2 text-white"
            placeHolder={
              item.outputAction === "physical"
                ? "101 King Street, Sydney"
                : "https://"
            }
            value={item?.outputLocation}
            labelColor="text-white/70"
            onChange={(e) =>
              onChange({
                ...item,
                outputLocation: e.target.value,
              })
            }
          /> */}
        </div>
      )}

      <XMarkIcon
        onClick={onDelete}
        className="absolute top-2 right-2 h-6 w-6 text-black/50 cursor-pointer hover:text-black/100 transition"
      />
    </Card>
  );
}

function LabelledSelect({ options, onChange, value, label, className }) {
  return (
    <div className={className}>
      <Label className="text-black/50 mb-1">{label}</Label>
      <Dropdown
        label={value?.substring(0, 1)?.toUpperCase() + value?.substring(1, 200)}
        theme={{
          floating: {
            target: "w-full bg-indigo-600 enabled:hover:bg-indigo-700",
          },
        }}
        color="dark"
        className="flex-1 min-w-72 capitalize"
        // className="bg-white/5 appearance-none px-4 text-black w-full h-10"
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((item, key) => (
          <Dropdown.Item
            onClick={(e) => onChange(item.value)}
            key={key}
            value={item.value}
          >
            {item.text}
          </Dropdown.Item>
        ))}
      </Dropdown>
    </div>
  );
}
