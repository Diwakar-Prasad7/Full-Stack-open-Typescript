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

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries?: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']> | undefined;
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const;

type HealthCheckRating = typeof HealthCheckRating[keyof typeof HealthCheckRating];

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

type SickLeave = {
  startDate: string;
  endDate: string;
};

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: SickLeave | undefined;
}

type Discharge = {
  date: string;
  criteria: string;
};

interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

const baseEntrySchema = z.object({
  description: z.string(),
  date: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.array(z.string()).optional()
});

const healthCheckSchema = baseEntrySchema.extend({
  type: z.literal("HealthCheck"),
  healthCheckRating: z.union([
    z.literal(0),
    z.literal(1),
    z.literal(2),
    z.literal(3)
  ])
});

const hospitalSchema = baseEntrySchema.extend({
  type: z.literal("Hospital"),
  discharge: z.object({
    date: z.string(),
    criteria: z.string()
  })
});

const occupationalSchema = baseEntrySchema.extend({
  type: z.literal("OccupationalHealthcare"),
  employerName: z.string(),
  sickLeave: z.object({
    startDate: z.string(),
    endDate: z.string()
  }).optional()
});


export const entrySchema = z.discriminatedUnion("type", [
  hospitalSchema,
  occupationalSchema,
  healthCheckSchema
]);