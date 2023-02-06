const calculateBmi = (heigh: number, weight: number): string => {
  let diagnosis: string;
  let bmi: number = weight / (heigh / 100) ** 2;
  if (bmi < 18.5) {
    diagnosis = "Underweight (Thin)";
  } else if (bmi >= 18.5 && bmi <= 24.9) {
    diagnosis = "Normal (healthy weight)";
  } else {
    diagnosis = "Overweight";
  }
  return diagnosis;
};

console.log(calculateBmi(120, 74));
