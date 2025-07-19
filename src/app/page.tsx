import Image from "next/image";
import HeroSection from "./components/HeroSection";
import HealthCard from "./components/HealthCards";
import CheckBMI from "./components/CheckBMI";


export default function Home() {
  return (
    <div className=" min-h-screen sm:p-20">
      <HeroSection></HeroSection>
      <HealthCard></HealthCard>
      <CheckBMI></CheckBMI>
    </div>
  );
}
