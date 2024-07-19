import { Spotter, Sale, TreasureMap } from "@/app/components/lottie";

import useUserLocation from "./hooks/useUserLocation";
import MapView from "./components/Map";


export default async function Home() {
  const { latitude, longitude } = await useUserLocation();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white">Sale Spotter</h1>
        <p className="text-3xl font-bold text-yellow-300 pt-2.5">Buy & Sell the Best Treasures Near You!</p>

        {/* <Sale />
        <Spotter /> */}
      </div>
      {/* <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-zinc-800/30">Searching for Treasure locally? Need that once in a lifetime find? Need a unique piece for your home or business? Sale Spotter is the app for you! We help you find Estate, Garage, Moving, and Yard Sales in your area. Looking for a way to make extra cash and make extra space around your home? List your sale with us to get location based exposure and bring the customers to you!</p>
      </div> */}
      <div>
        <TreasureMap />
      </div>
        <p className="left-0 top-0 flex w-1/2 justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:dark:bg-zinc-800/30">The old adage one man’s trash is another man’s treasure still holds true today whether looking for a unique piece or making some cash instead of throwing things away. Whether it’s Garage or Yard, Moving or Estate list your sale to be starred and let your item find it’s mate!  Make some cash and get it done and let the customers come to you, Sale Spotter lists them all and does it location based too. So when searching for that item (coffee table or lawn gnome) you can choose where to search or just do it close to home. So Click on Sales or Sign Up and you will be on your way to finding treasures or selling things and making cash today!</p>
      <MapView />

      {/* <p className="text-3xl font-bold text-yellow-300">Your location:</p> */}
      <p>
        {latitude} {longitude}
      </p>
    </main>
  );
}
