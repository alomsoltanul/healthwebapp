"use client";
import healthData from "../data/healthapp.json";
import { BackgroundGradient } from "./ui/background-gradient";

interface HealthCard {
    id: number,
    title: string,
    description: string,
    short_details: string,
    uniqueId : boolean,
}

export default function HealthCard() {

    const healthCC = healthData.features.filter((healthcard: HealthCard) => healthcard.uniqueId)
    return (
        <div className=" pt-12">
            <div>
                <h1 className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">
                    健康を意識するポイント
                </h1>
                <p className="text-xs px-4 md:text-xl lg:text-xl font-bold text-amber-500 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto ">
                    トップの健康カードがここに表示されます
                </p>
            </div>
            <div className=" my-10">
                <div className=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-8 justify-center">
                    {healthCC.map((healthcard: HealthCard) => (
                        <div  key={healthcard.id} className=" flex justify-center">
                            <BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900">
                                <img
                                    src={`/jordans.webp`}
                                    alt="jordans"
                                    height="400"
                                    width="400"
                                    className="object-contain"
                                />
                                <p className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                                    {healthcard.title}
                                </p>

                                <p className="text-sm text-neutral-600 dark:text-neutral-400">
                                    {healthcard.short_details}
                                </p>
                                <button className="rounded-full pl-4 pr-1 py-1 text-white flex items-center space-x-1 bg-black mt-4 text-xs font-bold dark:bg-zinc-800">
                                    <span>Buy now </span>
                                    <span className="bg-zinc-700 rounded-full text-[0.6rem] px-2 py-0 text-white">
                                        $100
                                    </span>
                                </button>
                            </BackgroundGradient>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex items-center text-center m-auto">
                <button className=" p-2 px-10 bg-fuchsia-700 m-auto mt-10  rounded-3xl border-0">すべて見る</button>
            </div>
        </div>
    )
}