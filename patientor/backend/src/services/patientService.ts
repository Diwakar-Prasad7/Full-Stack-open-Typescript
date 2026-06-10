import { v1 as uuid } from 'uuid';
import patientsEntries from '../../data/patients.ts';
import type { NewPatient, NonSensitivePatient, Patient } from '../../types.ts';

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
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
    id: uuid(),
    ...entry
  };
  patientsEntries.push(NewPatientEntry);
  return NewPatientEntry;
};

export default { getEntries, getNonSensitiveEntries, addPatient };