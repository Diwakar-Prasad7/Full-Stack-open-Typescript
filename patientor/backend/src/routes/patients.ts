import type { NonSensitivePatient } from '../../types.ts';
import express, { type Response } from 'express';
import patientService from '../services/patientService.ts';
import parseNewPatientEntry from '../../utils.ts';

const router = express.Router();

router.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
    res.json(patientService.getNonSensitiveEntries());
});

router.post('/', (req, res) => {
    try {
        const NewPatientEntry = parseNewPatientEntry(req.body);
        const addedEntry = patientService.addPatient(NewPatientEntry);
        res.json(addedEntry);
    } catch (error: unknown){
        let errorMessage = 'Something went wrong';
        if (error instanceof Error) {
            errorMessage += 'Error: ' + errorMessage;        
        }
        res.status(400).send(errorMessage);
    }
    });


export default router;