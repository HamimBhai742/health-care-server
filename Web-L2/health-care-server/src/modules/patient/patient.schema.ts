import z from 'zod';
export const Gender = z.enum(['MALE', 'FEMALE', 'OTHER']);
export const BloodGroup = z.enum([
  'A_POSITIVE',
  'A_NEGATIVE',
  'B_POSITIVE',
  'B_NEGATIVE',
  'AB_POSITIVE',
  'AB_NEGATIVE',
  'O_POSITIVE',
  'O_NEGATIVE',
]);
export const MartialStatus = z.enum([
  'SINGLE',
  'MARRIED',
  'DIVORCED',
  'WIDOWED',
]);

// 🧠 Update schema for PatientHealthData
const updatePatientHealthDataSchema = z.object({
  gender: Gender.optional(),
  dateOfBirth: z.string().optional(),
  bloodGroup: BloodGroup.optional(),
  hasAllergies: z.boolean().optional(),
  hasDiabetes: z.boolean().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  smokingStatus: z.boolean().optional(),
  dietaryPreferences: z.boolean().optional(),
  pregnancyStatus: z.boolean().optional(),
  mentalHealthHistory: z.string().optional(),
  immunizationStatus: z.boolean().optional(),
  hasPastSurgeries: z.boolean().optional(),
  recentAnxiety: z.boolean().optional(),
  recentDepression: z.boolean().optional(),
  maritalStatus: MartialStatus.optional(),
});

// 📄 Update schema for MedicalReport
 const updateMedicalReportSchema = z.object({
  reportName: z.string().optional(),
  reportLink: z.string().optional(),
});

export const PatientZodeSchema = z.object({
  name: z.string().optional(),
  address: z.string().optional(),
  contactNumber: z.string().optional(),
  isDeleted: z.boolean().optional(),
  medicalReport: updateMedicalReportSchema.optional(),
  patientHealthData: updatePatientHealthDataSchema.optional(),
});
