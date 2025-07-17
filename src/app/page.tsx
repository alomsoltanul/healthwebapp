import Image from "next/image";
import HeroSection from "./components/HeroSection";
import HealthCard from "./components/HealthCards";

export default function Home() {
  return (
    <div className=" min-h-screen sm:p-20">
      <HeroSection></HeroSection>
      <HealthCard></HealthCard>
    </div>
  );
}
