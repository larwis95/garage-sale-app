import useUserLocation from "../hooks/useUserLocation";
import SaleSection from "../components/SaleSection";
import { Sale } from "@/app/components/lottie";

export default async function Sales() {
  const { latitude, longitude } = await useUserLocation();
  return (
    <>
    {/* <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <Sale />
    </div> */}
      <main className="flex min-h-screen flex-col items-center  justify-around p-10">
        <SaleSection coordinates={{ latitude, longitude }} />
      </main>
    </>
  );
}
