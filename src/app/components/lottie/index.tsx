"use client";
import Lottie from "lottie-react";
import treasure from "@/app/images/treasure.json";
import sale2 from "@/app/images/sale2.json";
import spotter1 from "@/app/images/spotter1.json";
import treasureMap from "@/app/images/treasureMap.json";

export function Treasure() {
  return (
    <div className="lottie-icon">
      <Lottie loop={true} animationData={treasure}></Lottie>
    </div>
  );
}

export function Sale() {
  return (
    <div className="lottie-icon inline-block w-72 h-72">
      <Lottie loop={true} animationData={sale2}></Lottie>
    </div>
  );
}

export function Spotter() {
  return (
    <div className="lottie-icon inline-block w-60 h-60">
      <Lottie loop={true} animationData={spotter1}></Lottie>
    </div>
  );
}

export function TreasureMap() {
  return (
    <div className="lottie-icon inline-block w-48 h-48">
      <Lottie loop={true} animationData={treasureMap}></Lottie>
    </div>
  );
}


