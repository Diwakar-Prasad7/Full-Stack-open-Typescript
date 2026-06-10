import {type NewPatient, type NonSensitivePatient, type Patient } from '../types.ts';
import express, { type Request, type Response } from 'express';
import patientService from '../services/patientService.ts';
import { errorMiddleware, newPatientParser } from '../middleware.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.json(patientService.getNonSensitiveEntries());
});


router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedEntry = patientService.addPatient(req.body);
  res.json(addedEntry);
});

router.use(errorMiddleware);

export default router;