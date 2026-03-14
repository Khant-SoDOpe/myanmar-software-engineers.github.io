/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";
// @ts-ignore
import Typewriter from "typewriter-effect/dist/core";
import dialogArray from "./choices.json";

interface VNProps {
  setClick: (value: boolean) => void;
  setAudioTime: (value: number) => void;
}

const VN: React.FC<VNProps> = ({ setClick, setAudioTime }) => {
  const start = () => {
    document.getElementById("start")?.classList.add("hidden");
    document.getElementById("vn")?.classList.remove("hidden");
    try {
      let audio = new Audio(
        "https://drive.google.com/uc?id=1vDo02iqo8lOEUhVouXh5FZNOXZh3FzM9"
      );
      audio.preload = "auto";
      audio.volume = 0.5;
      audio.addEventListener("canplay", () => {
        audio.play().catch(() => {});
      });
      audio.addEventListener("error", () => {});
      audio.load();
      song = audio;
    } catch {
      song = null;
    }
  };
  let song: HTMLAudioElement | null = null;
  let oneClicked = false;
  let twoClicked = false;
  let data: any[] = [];
  const nextDialog = () => {
    if (data.length == 0) {
      return;
    }
    if (data[1] && typeof data[1] != "string") {
      if (!data[1].dialog) {
        choiceBox?.classList.toggle("hidden");
        console.log(data);
        if (questionOne) questionOne.innerHTML = data[1].question1;
        if (questionTwo) questionTwo.innerHTML = data[1].question2;
        questionOne?.addEventListener("click", (e: Event) => {
          if (!oneClicked) {
            choiceBox?.classList.toggle("hidden");
            if (sprite) sprite.src = data[2]?.answer1?.image ?? "";
            let typewriter = new Typewriter(dialog, {
              delay: 50,
            });
            typewriter.typeString(data[2]?.answer1?.dialog ?? "").start();
            data = data.slice(3);
            oneClicked = true;
          }
        });
        questionTwo?.addEventListener("click", (e: Event) => {
          if (!twoClicked) {
            choiceBox?.classList.toggle("hidden");
            if (sprite) sprite.src = data[2]?.answer2?.image ?? "";
            let typewriter = new Typewriter(dialog, {
              delay: 50,
            });
            typewriter.typeString(data[2]?.answer2?.dialog ?? "").start();
            data = data.slice(3);
            twoClicked = true;
          }
        });
      } else {
        let typewriter = new Typewriter(dialog, {
          delay: 50,
        });
        typewriter.typeString(data[0]?.dialog ?? "").start();
        if (sprite) sprite.src = data[0]?.image ?? "";
        oneClicked = false;
        twoClicked = false;
        data = data.slice(1);
      }
    } else {
      if (data[0] == "done") {
        try {
          if (song) {
            song.volume = 0.3;
            const currentTime = song.currentTime;
            setTimeout(() => {
              try { if (song) song.volume = 0; } catch {}
            }, 1000);
            setAudioTime(currentTime);
          } else {
            setAudioTime(0);
          }
        } catch {
          setAudioTime(0);
        }
        setClick(true);
        return;
      }
      let typewriter = new Typewriter(dialog, {
        delay: 50,
      });
      typewriter.typeString(data[0]?.dialog ?? "").start();
      if (sprite) sprite.src = data[0]?.image ?? "";
      oneClicked = false;
      twoClicked = false;
      data = data.slice(1);
    }
  };

  let dialog: any;
  let choiceBox: any;
  let questionOne: any;
  let questionTwo: any;
  let sprite: any;

  useEffect(() => {
    dialog = document.getElementById("dialog");
    data = dialogArray as any[];
    let typewriter = new Typewriter(dialog, {
      delay: 50,
    });
    typewriter.typeString(data[0]?.dialog ?? "").start();
    choiceBox = document.getElementById("choiceBox");
    questionOne = document.getElementById("questionOne");
    questionTwo = document.getElementById("questionTwo");
    sprite = document.getElementById("sprite");
  }, []);
  return (
    <>
      <div className="relative h-[500px]" id="start">
        <div
          onClick={start}
          className="mb-3 absolute z-[99] rounded-lg w-[150px] border border-white text-center cursor-pointer hover:bg-opacity-70 h-[50px] p-3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-[30%] bg-black bg-opacity-50"
        >
          Start
        </div>
      </div>
      <div
        onClick={nextDialog}
        className="flex hidden flex-col relative md:flex-row select-none hover:cursor-pointer"
        id="vn"
      >
        <div className="flex md:justify-center sm:justify-center lg:justify-end xl:justify-end w-full md:z-[0] z-[0] sm:z-[0] lg:z-[5] xl:z-[5]">
          <img
            src="https://i.imgur.com/YUYwLuE.png"
            id="sprite"
            width="500px"
            alt="Hello"
          />
        </div>
        <div className="absolute h-[200px] w-[90%] text-white bg-black z-[0] opacity-[50%] rounded-lg top-[399px] lg:bottom-0 xl:bottom-0"></div>
        <div className="absolute text-white bottom-[60px] lg:bottom-[200px] xl:bottom-[200px] z-[1] text-xl">
          Thant Htet Aung
        </div>
        <div
          className="absolute text-white font-bold bottom-[2px] lg:bottom-[130px] xl:bottom-[130px] left-[30px] z-[1] text-md w-[580px] break-words inline-block"
          id="dialog"
        ></div>
      </div>
      <div id="choiceBox" className="hidden">
        <div
          id="questionOne"
          className="mb-3 absolute z-[99] rounded-lg w-[550px] border border-white text-center cursor-pointer hover:bg-opacity-70 h-[50px] p-3 top-[30%] left-1/2 transform -translate-x-1/2 -translate-y-[30%] bg-black bg-opacity-50"
        >
          Choice One
        </div>
        <div
          id="questionTwo"
          className="mb-3 absolute z-[99] rounded-lg w-[550px] border border-white text-center cursor-pointer hover:bg-opacity-70 h-[50px] p-3 top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-[40%] bg-black bg-opacity-50"
        >
          Choice Two
        </div>
      </div>
    </>
  );
};

export default VN;
