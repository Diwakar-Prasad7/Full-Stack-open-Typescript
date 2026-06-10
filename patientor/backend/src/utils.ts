// import { z } from "zod";
// import { GenderValues, type NewPatient } from "./types.ts";

// export const NewPatientSchema = z.object({
//   name: z.string(),
//   dateOfBirth: z.iso.date(),
//   ssn: z.string(),
//   gender: z.enum(GenderValues),
//   occupation: z.string()
// });

// const parseNewPatientEntry = (object: unknown): NewPatient => {
//     return NewPatientSchema.parse(object);
// };


// export default parseNewPatientEntry;