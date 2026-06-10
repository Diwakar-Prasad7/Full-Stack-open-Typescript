import express from 'express';
import cors from 'cors';
import diagnosesRouter from './routes/diagnoses.ts';
import patientsRouter from './routes/patients.ts';

const app = express();
app.use(express.json());
 
app.use(cors());
app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter);

const port = 3001;

app.get('/api/ping', (_req, res) => {
    res.send('pong');
});

app.listen(port, () => {
    console.log(`server is running on port${port}`);
});