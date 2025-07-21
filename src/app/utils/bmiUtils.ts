// we will be calculating bmi
// and category

export function calculateBMI (weight : number , height : number) : number{
    const heightInMeters = height / 100;
    return +(weight / (heightInMeters ** 2)).toFixed(2);
}


export function getBMICategory (bmi : number) : string{
    if(bmi < 18.5) return "Underweight";
    else if(bmi < 24.9) return "Normal weight";
    else if(bmi < 29.9) return "Overweight";
    else return "Obesity";
}