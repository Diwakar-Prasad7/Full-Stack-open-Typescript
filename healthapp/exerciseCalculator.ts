import { isNotNumber } from './utils.ts';

interface ExercisesReview {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (dailyHrs: number[], target: number): ExercisesReview => {
  const totalHours = dailyHrs.reduce((sum, hrs) => sum + hrs, 0);
  const average = totalHours / dailyHrs.length;

  let rating: number;
  let ratingDescription: string;

  if (average >= target) {
    rating = 3;
    ratingDescription = 'great job, target achieved';
  } else if (average >= target * 0.75) {
    rating = 2;
    ratingDescription = 'not too bad but could be better';
  } else {
    rating = 1;
    ratingDescription = 'you need to work harder';
  }

  return {
    periodLength: dailyHrs.length,
    trainingDays: dailyHrs.filter(h => h > 0).length,
    success: average >= target,
    rating,
    ratingDescription,
    target,
    average
  };
};

const parseArguments = (args: string[]): {target: number; dailyHours: number[] } => {
  if (args.length < 4) {
    throw new Error('Not enough arguments');
  }

  if (args.slice(2).some(isNotNumber)) {
    throw new Error('Provided values were not numbers!');
  }

  const target = Number(args[2]);
  const dailyHours = args.slice(3).map(Number);

  return {
    target,
    dailyHours
  };
};

if (import.meta.url === `file://${process.argv[1]}`) {
  try {
    const { target, dailyHours } = parseArguments(process.argv);
    console.log(calculateExercises(dailyHours, target));
  } catch (error) {
    let errorMessage = 'Something bad happened.';
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }
}