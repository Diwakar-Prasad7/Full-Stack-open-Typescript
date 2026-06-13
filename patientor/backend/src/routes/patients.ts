import {entrySchema, type NewPatient, type NonSensitivePatient, type Patient } from '../types.ts';
import express, { type Request, type Response } from 'express';
import patientService from '../services/patientService.ts';
import { errorMiddleware, newPatientParser } from '../middleware.ts';
import { v1 as uuid } from 'uuid';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.json(patientService.getNonSensitiveEntries());
});


router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {
  const addedEntry = patientService.addPatient(req.body);
  res.json(addedEntry);
});

router.get('/:id', (req, res: Response<Patient>) => {
  const id: string = req.params.id;
  const patient = patientService.findById(id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404);
  }
});

router.post("/:id/entries", (req, res) => {
  try {
    const newEntry = entrySchema.parse(req.body);

    const patient = patientService.findById(req.params.id);

    if (!patient) {
      return res.status(404).send({ error: "Patient not found" });
    }

    const entryWithId = {
      ...newEntry,
      id: uuid()
    };

    patient.entries = patient.entries ?? [];
    patient.entries.push(entryWithId);

    return res.status(201).json(entryWithId);

  } catch (error) {
    return res.status(400).send({ error: "Invalid entry data" });
    console.log(error);
  }
});


router.use(errorMiddleware);

export default router;