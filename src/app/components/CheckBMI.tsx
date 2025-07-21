"use client";

import { useState } from "react";
import BMICalculatorForm from "./BMICalculatorForm";
import { Gender } from "../types";
import GenderSelector from "./GenderSelector"; 

const CheckBMI = () => {
    const [bmi, setBmi] = useState<number | null>(null);
    const [category, setCategory] = useState('');
    const [gender, setGender] = useState<Gender>('male');

    const handleResult = (bmi: number, category: string) => {
        setBmi(bmi);
        setCategory(category);
    };

    return (
        <div className="py-16">
            <h1 className="text-2xl px-4 md:text-4xl lg:text-5xl font-bold text-neutral-700 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto">
                BMIを計算する
            </h1>
            <p className="text-xs px-4 md:text-xl lg:text-xl font-bold text-amber-500 dark:text-white max-w-4xl leading-relaxed lg:leading-snug text-center mx-auto">
                BMIを回復するためのパーソナライズされたヒントを入手
            </p>


            <div className="flex justify-center my-4">
                <GenderSelector gender={gender} setGender={setGender} />
            </div>


            <BMICalculatorForm gender={gender} onResult={handleResult} />

            {bmi !== null && (
                <div className="mt-6 text-center">
                    <h2 className="text-xl font-semibold">あなたのBMIは: {bmi}</h2>
                    <p className="text-lg">Category: {category}</p>
                </div>
            )}
        </div>
    );
};

export default CheckBMI;
