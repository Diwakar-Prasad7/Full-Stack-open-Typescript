export const GenderValues = {
    male: 'male',
    female: 'female',
    other: 'other'
} as const;

export type Gender = typeof GenderValues[keyof typeof GenderValues];

export interface Diagnosis {
    code: string;
    name: string;
    latin?: string
}

export interface Patient {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
}

export type NewPatient = Omit<Patient, 'id'>;

export type NonSensitivePatient = Omit<Patient, 'ssn'>;