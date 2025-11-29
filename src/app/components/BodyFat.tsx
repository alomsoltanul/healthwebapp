// /pages/bodyfat.tsx  (or put in /app route with small wrapper)
"use client";
import React, { useState } from "react";

type Sex = "male" | "female";
type Units = "metric" | "imperial";

function cmToIn(cm: number) { return cm / 2.54; }
function inToCm(inch: number) { return inch * 2.54; }
function kgToLb(kg: number) { return kg * 2.2046226218; }
function lbToKg(lb: number) { return lb / 2.2046226218; }

function log10(x: number) { return Math.log(x) / Math.log(10); }

/** US Navy formula (expects cm) */
function navyBodyFat({ sex, heightCm, neckCm, waistCm, hipCm }: 
  {sex: Sex, heightCm: number, neckCm: number, waistCm: number, hipCm?: number}) {
  // Use cm values
  if (sex === "male") {
    // men: waist - neck
    const a = 86.010 * log10(Math.max(1, waistCm - neckCm));
    const b = 70.041 * log10(Math.max(1, heightCm));
    return a - b + 36.76;
  } else {
    // women: waist + hip - neck
    const a = 163.205 * log10(Math.max(1, waistCm + (hipCm || 0) - neckCm));
    const b = 97.684 * log10(Math.max(1, heightCm));
    return a - b - 78.387;
  }
}

/** Deurenberg formula: requires BMI, age, sex */
function deurenberg({ weightKg, heightCm, age, sex }: {weightKg: number, heightCm: number, age: number, sex: Sex}) {
  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const sexFlag = sex === "male" ? 1 : 0;
  return 1.2 * bmi + 0.23 * age - 10.8 * sexFlag - 5.4;
}

export default function BodyFatCheckerPage() {
  const [units, setUnits] = useState<Units>("metric");
  const [sex, setSex] = useState<Sex>("male");
  const [age, setAge] = useState<number>(24);
  const [height, setHeight] = useState<number>(170); // cm or inches depending on units
  const [weight, setWeight] = useState<number>(65); // kg or lb
  const [neck, setNeck] = useState<number>(38);
  const [waist, setWaist] = useState<number>(80);
  const [hip, setHip] = useState<number>(95);

  // convert inputs to metric (cm/kg) for formulas
  const heightCm = units === "metric" ? height : inToCm(height);
  const weightKg = units === "metric" ? weight : lbToKg(weight);
  const neckCm = units === "metric" ? neck : inToCm(neck);
  const waistCm = units === "metric" ? waist : inToCm(waist);
  const hipCm = units === "metric" ? hip : inToCm(hip);

  // Basic validation
  const errors: string[] = [];
  if (heightCm <= 0) errors.push("Height must be > 0");
  if (weightKg <= 0) errors.push("Weight must be > 0");
  if (neckCm <= 0) errors.push("Neck must be > 0");
  if (waistCm <= 0) errors.push("Waist must be > 0");
  if (sex === "female" && hipCm <= 0) errors.push("Hip must be > 0 for women");

  // Calculations
  const navy = (!errors.length) ? navyBodyFat({ sex, heightCm, neckCm, waistCm, hipCm: sex === "female" ? hipCm : undefined }) : NaN;
  const deuren = (!errors.length) ? deurenberg({ weightKg, heightCm, age, sex }) : NaN;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Body Fat Checker</h1>

      <div className="grid gap-3 mb-4">
        <label>
          Units:
          <select value={units} onChange={e => setUnits(e.target.value as Units)} className="ml-2">
            <option value="metric">Metric (cm, kg)</option>
            <option value="imperial">Imperial (in, lb)</option>
          </select>
        </label>

        <label>
          Sex:
          <select value={sex} onChange={e => setSex(e.target.value as Sex)} className="ml-2">
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>

        <label>
          Age:
          <input type="number" min={10} value={age} onChange={e => setAge(Number(e.target.value))} className="ml-2 w-24" />
        </label>

        <label>
          Height ({units === "metric" ? "cm" : "in"}):
          <input type="number" min={0} value={height} onChange={e => setHeight(Number(e.target.value))} className="ml-2 w-32" />
        </label>

        <label>
          Weight ({units === "metric" ? "kg" : "lb"}):
          <input type="number" min={0} value={weight} onChange={e => setWeight(Number(e.target.value))} className="ml-2 w-32" />
        </label>

        <label>
          Neck ({units === "metric" ? "cm" : "in"}):
          <input type="number" min={0} value={neck} onChange={e => setNeck(Number(e.target.value))} className="ml-2 w-32" />
        </label>

        <label>
          Waist ({units === "metric" ? "cm" : "in"}):
          <input type="number" min={0} value={waist} onChange={e => setWaist(Number(e.target.value))} className="ml-2 w-32" />
        </label>

        {sex === "female" && (
          <label>
            Hip ({units === "metric" ? "cm" : "in"}):
            <input type="number" min={0} value={hip} onChange={e => setHip(Number(e.target.value))} className="ml-2 w-32" />
          </label>
        )}
      </div>

      {errors.length > 0 ? (
        <div className="text-red-600 mb-4">
          {errors.map((e, i) => <div key={i}>{e}</div>)}
        </div>
      ) : (
        <div className="bg-gray-50 p-4 rounded">
          <h2 className="font-semibold">Results</h2>
          <p>US Navy estimate: <strong>{Number.isFinite(navy) ? navy.toFixed(1) + " %" : "—"}</strong></p>
          <p>Deurenberg (BMI) estimate: <strong>{Number.isFinite(deuren) ? deuren.toFixed(1) + " %" : "—"}</strong></p>
          <p className="text-sm text-gray-600 mt-2">Notes: US Navy needs neck+waist (+hip for women). Deurenberg is BMI-based and less accurate for muscular builds.</p>
        </div>
      )}
    </div>
  );
}
