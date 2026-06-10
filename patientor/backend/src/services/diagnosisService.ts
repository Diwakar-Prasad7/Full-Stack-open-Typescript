import diagnosesEntries from '../../data/diagnoses.ts';
import type { Diagnosis } from '../../types.ts';

const getEntries = (): Diagnosis[] => {
    return diagnosesEntries;
};

export default { getEntries };