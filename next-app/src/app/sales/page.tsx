import useUserLocation from "../hooks/useUserLocation";
import SaleSection from "../components/SaleSection";

export default async function Sales() {
  const { latitude, longitude } = await useUserLocation();
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-around p-24">
        <SaleSection coordinates={{ latitude, longitude }} />
      </main>
    </>
  );
}
