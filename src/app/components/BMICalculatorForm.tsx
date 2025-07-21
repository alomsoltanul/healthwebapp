"use client";
import { useState } from "react";
import { Gender, UserInput } from "../types";
import { calculateBMI, getBMICategory } from "../utils/bmiUtils";


interface Props {
    gender: Gender;
    onResult: (bmi: number, category: string) => void;
}

const BMICalculatorForm = ({ gender, onResult }: Props) => {
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const h = parseFloat(height);
        const w = parseFloat(weight);
        const bmi = calculateBMI(w, h);
        const category = getBMICategory(bmi);
        onResult(bmi, category);
        
    };

    return (
        <form onSubmit={handleSubmit} className=" flex flex-col gap-4 mt-4">
            <input type="number" value={age} onChange={e => setAge(e.target.value)} placeholder="Age" className="border p-2 rounded" required />
            <input type="number" value={height} onChange={e => setHeight(e.target.value)} placeholder="Height (cm)" className="border p-2 rounded" required />
            <input type="number" value={weight} onChange={e => setWeight(e.target.value)} placeholder="Weight (kg)" className="border p-2 rounded" required />
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded">Calculate BMI</button>
        </form>
    );

};


export default BMICalculatorForm;