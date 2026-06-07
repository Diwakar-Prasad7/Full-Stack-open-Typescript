import express from 'express';
import { calculateBmi } from './bmiCalculator.ts';
import { calculateExercises } from './exerciseCalculator.ts';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const height: number = Number(req.query.height);
    const weight: number = Number(req.query.weight);

    if (!height || !weight || isNaN(height) || isNaN(weight)) {
    return res.status(400).json({
      error: "malformatted parameters"
    });
  }

    return res.json({
        weight,
        height,
        bmi: calculateBmi(height, weight)
    });
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target } = req.body;

  if (daily_exercises === undefined || target === undefined) {
    return res.status(400).json({
      error: 'parameters missing'
    });
  }

  if (
    !Array.isArray(daily_exercises) ||
    isNaN(Number(target)) ||
    daily_exercises.some(exercise => isNaN(Number(exercise)))
  ) {
    return res.status(400).json({
      error: 'malformatted parameters'
    });
  }

  const exercises = daily_exercises.map(Number);

  return res.json(
    calculateExercises(exercises, Number(target))
  );
});

const port = 3000;
app.listen(port, () => {
    console.log(`server running at port${port}`);
});