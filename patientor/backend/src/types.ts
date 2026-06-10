import { z } from 'zod';

export const GenderValues = {
  male: 'male',
  female: 'female',
  other: 'other'
} as const;

export type Gender = typeof GenderValues[keyof typeof GenderValues];

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(GenderValues),
  occupation: z.string()
});

export type NewPatient = z.infer<typeof NewPatientSchema>;

export interface Patient extends NewPatient {
  id: string;
};


export type NonSensitivePatient = Omit<Patient, 'ssn'>;