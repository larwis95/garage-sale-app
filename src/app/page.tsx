import { Spotter, Sale, TreasureMap } from "@/app/components/lottie";

import useUserLocation from "./hooks/useUserLocation";
import useNearBySales from "./hooks/useNearBySales";
import MapView from "./components/Map";

export default async function Home() {
  const { latitude, longitude } = await useUserLocation();
  const sales = await useNearBySales({ latitude, longitude }, 16);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-20 px-5">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white">Sale Spotter</h1>
        <p className="pt-2.5 text-3xl font-bold text-yellow-300">Buy & Sell the Best Treasures Near You!</p>

        {/* <Sale />
        <Spotter /> */}
      </div>
      <div>
        <TreasureMap />
      </div>
      <MapView position={{ lat: latitude, lng: longitude }} sales={sales} zoom={16} />

      {/* <p className="text-3xl font-bold text-yellow-300">Your location:</p> */}
      <p>
        {/* {latitude} {longitude} */}
      </p>
         <div className="w-full max-w-5xl items-center justify-between font-Monaco text-sm lg:flex mb-20">
        <p className="p-2 border shadow-sm shadow-teal-500 border-2 border-teal-500 rounded-lg bg-slate-800 bg-opacity-65 text-lg font-bold text-yellow-300 text-md text-center">List your sale or go on a treasure hunt today whether looking for a unique piece or making some cash instead of throwing things away. Garage or Yard, Moving or Estate list your sale to be starred and let your item find it’s mate! If it`s Buying or Selling that you are looking to do Sale Spotter can help along the way, So start a search for a treasure or two and/or list your sale today!</p>
      </div>
    </main>
  );
}
