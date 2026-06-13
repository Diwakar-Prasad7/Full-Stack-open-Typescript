import { v1 as uuid } from 'uuid';
import patientsEntries from '../../data/patients.ts';
import type { NewPatient, NonSensitivePatient, Patient } from '../types.ts';

const getEntries = (): Patient[] => {
    return patientsEntries;
};

const getNonSensitiveEntries = (): NonSensitivePatient[] => {
  return patientsEntries.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation
    })
  );
};

const addPatient = ( entry: NewPatient): Patient => {
  const NewPatientEntry: Patient = {
    id: uuid(),
    ...entry
  };
  patientsEntries.push(NewPatientEntry);
  return NewPatientEntry;
};

const findById = (id: string): Patient | undefined => {
  const entry = patientsEntries.find(patient => patient.id === id);
  return entry;
};

export default { getEntries, getNonSensitiveEntries, addPatient, findById };