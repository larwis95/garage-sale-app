import useUserLocation from "../hooks/useUserLocation";
import SaleSection from "../components/SaleSection";
import { Sale } from "@/app/components/lottie";

export default async function Sales() {
  const { latitude, longitude } = await useUserLocation();
  return (
    <>
      <main className="flex min-h-screen w-screen flex-col items-center p-10">
        <SaleSection coordinates={{ latitude, longitude }} />
      </main>
    </>
  );
}
