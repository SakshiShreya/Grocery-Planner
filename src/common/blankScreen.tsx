import { Button } from "@nextui-org/react";

type Props = { name: string; onAdd: () => void };

const emojis = [
  "😕",
  "🫤",
  "😟",
  "🙁",
  "☹️",
  "😮",
  "😯",
  "😲",
  "😳",
  "🥺",
  "🥹",
  "😦",
  "😧",
  "😨",
  "😰",
  "😥",
  "😢",
  "😭",
  "😱",
  "😖",
  "😣",
  "😞",
  "😓",
  "😩",
  "😫"
];

export default function BlankScreen({ name, onAdd }: Props) {
  return (
    <main className="text-center px-6 py-24">
      <p className="text-4xl">{emojis[Math.floor(Math.random() * emojis.length)]}</p>
      <p className="text-3xl mt-4 font-bold">No {name} found</p>
      <Button className="mt-10" color="primary" onClick={onAdd}>
        Add {name}
      </Button>
    </main>
  );
}
