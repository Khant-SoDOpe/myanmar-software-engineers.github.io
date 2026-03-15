import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const colors = ["bg-prism-violet/30", "bg-prism-cyan/30", "bg-prism-rose/30"];

const textColors = ["text-prism-violet", "text-prism-cyan", "text-prism-rose"];

const fillColors = ["fill-prism-violet", "fill-prism-cyan", "fill-prism-rose"];

const strokeColors = [
  "stroke-prism-violet",
  "stroke-prism-cyan",
  "stroke-prism-rose",
  "stroke-violet-200",
  "stroke-cyan-200",
  "stroke-rose-200",
];

function getRandomItem(arr: string[]) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  const item = arr[randomIndex];
  return item;
}

export function generateColor() {
  return getRandomItem(colors);
}

export function generateColorArray(maxLength: number) {
  let colorArray: string[] = [];
  for (let i = 0; i < maxLength; i++) {
    colorArray.push(generateColor());
  }
  return colorArray;
}
