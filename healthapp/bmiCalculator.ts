import { isNotNumber } from './utils.ts';
import { fileURLToPath } from 'node:url';

export type BmiCategory =
  | 'Underweight (Severe thinness)'
  | 'Underweight (Moderate thinness)'
  | 'Underweight (Mild thinness)'
  | 'Normal range'
  | 'Overweight (Pre-obese)'
  | 'Obese (Class I)'
  | 'Obese (Class II)'
  | 'Obese (Class III)';

export const calculateBmi = (height: number, weight: number): BmiCategory => {
  const bmi = weight / ((height / 100) ** 2);

  if (bmi < 16) return 'Underweight (Severe thinness)';
  if (bmi < 17) return 'Underweight (Moderate thinness)';
  if (bmi < 18.5) return 'Underweight (Mild thinness)';
  if (bmi < 25) return 'Normal range';
  if (bmi < 30) return 'Overweight (Pre-obese)';
  if (bmi < 35) return 'Obese (Class I)';
  if (bmi < 40) return 'Obese (Class II)';
  return 'Obese (Class III)';
};

const parseArguments = (args: string[]): {height: number, weight: number} => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }

  if (isNotNumber(args[2]) || isNotNumber(args[3])) {
    throw new Error('Provided values were not numbers!');
  }
  const height = Number(args[2]);
  const weight = Number(args[3]);

  return {height, weight};
};

const isMainModule =
  process.argv[1] === fileURLToPath(import.meta.url);

if (isMainModule) {
  try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
  } catch (error: unknown) {
    let errorMessage = "Something bad happened.";

    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }

    console.log(errorMessage);
  }
}
