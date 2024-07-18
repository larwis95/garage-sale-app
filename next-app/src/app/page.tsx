import { Spotter, Sale, TreasureMap } from "@/app/components/lottie";

import useUserLocation from "./hooks/useUserLocation";

export default async function Home() {
  const { latitude, longitude } = await useUserLocation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white">Sale Spotter</h1>
        <p className="text-3xl font-bold text-yellow-300">Buy & Sell the Best Treasures Near You!</p>

        {/* <Sale />
        <Spotter /> */}
      </div>
      {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-zinc-800/30">Searching for Treasure locally? Need that once in a lifetime find? Need a unique piece for your home or business? Sale Spotter is the app for you! We help you find Estate, Garage, Moving, and Yard Sales in your area. Looking for a way to make extra cash and make extra space around your home? List your sale with us to get location based exposure and bring the customers to you!</p>
      </div> */}
      <div>
        <TreasureMap />
      </div>

      <p className="text-3xl font-bold text-yellow-300">Your location:</p>
      <p>
        {latitude} {longitude}
      </p>
    </main>
  );
}
