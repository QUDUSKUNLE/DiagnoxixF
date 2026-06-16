import {
    DiagnosticCentre,
    Practitioner,
    TestOffering,
    TestType
} from '@/types';

// Mock diagnostic centers
export const mockCenters: DiagnosticCentre[] = [
  {
    diagnostic_centre_id: '1',
    diagnostic_centre_name: 'City Health Diagnostic Centre',
    address: {
      street: '123 Main Street',
      city: 'Downtown',
      state: 'Lagos',
      country: 'Nigeria',
    },
    latitude: 6.5244,
    longitude: 3.3792,
    availability: '9:00 AM - 5:00 PM',
    contact: {
      email: 'contact@cityhealth.com',
      phone: ['+234-123-456-7890'],
    },
    doctors: ['male', 'female'],
    test_prices: [{ test_type: 'BLOOD_TEST', price: 5000 }],
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    diagnostic_centre_id: '2',
    diagnostic_centre_name: 'Elite Medical Labs',
    address: {
      street: '456 Medical Avenue',
      city: 'Victoria Island',
      state: 'Lagos',
      country: 'Nigeria',
    },
    latitude: 6.4281,
    longitude: 3.4219,
    contact: {
      email: 'info@elitemed.com',
      phone: ['+234-123-456-7891'],
    },
    doctors: ['male', 'female'],
    test_prices: [{ test_type: 'BLOOD_TEST', price: 5000 }],
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    diagnostic_centre_id: '3',
    diagnostic_centre_name: 'Advanced Diagnostic Services',
    address: {
      street: '789 Health Boulevard',
      city: 'Lekki',
      state: 'Lagos',
      country: 'Nigeria',
    },
    latitude: 6.4554,
    longitude: 3.4711,
    contact: {
      email: 'admin@advanceddiagnostics.com',
      phone: ['+234-123-456-7892'],
    },
    doctors: ['male', 'female'],
    test_prices: [{ test_type: 'BLOOD_TEST', price: 5000 }],
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    diagnostic_centre_id: '4',
    diagnostic_centre_name: 'Prime Care Diagnostics',
    address: {
      street: '321 Wellness Road',
      city: 'Ikeja',
      state: 'Lagos',
      country: 'Nigeria',
    },
    latitude: 6.5244,
    longitude: 3.3166,
    contact: {
      email: 'contact@primecare.com',
      phone: ['+234-123-456-7893'],
    },
    doctors: ['male', 'female'],
    test_prices: [{ test_type: 'BLOOD_TEST', price: 5000 }],
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
  {
    diagnostic_centre_id: '5',
    diagnostic_centre_name: 'Metro Health Labs',
    address: {
      street: '654 Diagnosis Way',
      city: 'Surulere',
      state: 'Lagos',
      country: 'Nigeria',
    },
    latitude: 6.5000,
    longitude: 3.3500,
    contact: {
      email: 'support@metrohealth.com',
      phone: ['+234-123-456-7894'],
    },
    doctors: ['male', 'female'],
    test_prices: [{ test_type: 'BLOOD_TEST', price: 5000 }],
    created_at: '2021-01-01',
    updated_at: '2021-01-01',
  },
];

// Mock test types
export const mockTestTypes: TestType[] = [
  { id: '1', name: 'Blood Test - Complete', description: 'Full blood count and analysis', category: 'Hematology' },
  { id: '2', name: 'MRI Scan', description: 'Magnetic Resonance Imaging', category: 'Imaging' },
  { id: '3', name: 'CT Scan', description: 'Computed Tomography Scan', category: 'Imaging' },
  { id: '4', name: 'X-Ray', description: 'Radiographic imaging', category: 'Imaging' },
  { id: '5', name: 'Ultrasound', description: 'Sonographic examination', category: 'Imaging' },
  { id: '6', name: 'ECG', description: 'Electrocardiogram', category: 'Cardiology' },
  { id: '7', name: 'Urine Analysis', description: 'Urine test and culture', category: 'Laboratory' },
  { id: '8', name: 'COVID-19 Test', description: 'PCR or Rapid Antigen Test', category: 'Infectious Disease' },
];

// Mock practitioners
export const mockPractitioners: Practitioner[] = [
  { id: '1', name: 'Dr. Sarah Adebayo', gender: 'female', specialization: 'Hematology', yearsOfExperience: 8 },
  { id: '2', name: 'Dr. James Okafor', gender: 'male', specialization: 'Radiology', yearsOfExperience: 12 },
  { id: '3', name: 'Dr. Fatima Mohammed', gender: 'female', specialization: 'Imaging', yearsOfExperience: 6 },
  { id: '4', name: 'Dr. Peter Chukwu', gender: 'male', specialization: 'Cardiology', yearsOfExperience: 10 },
  { id: '5', name: 'Dr. Amina Hassan', gender: 'female', specialization: 'Laboratory', yearsOfExperience: 7 },
  { id: '6', name: 'Dr. Musa Ibrahim', gender: 'male', specialization: 'Radiology', yearsOfExperience: 9 },
];

// Mock test offerings
export const mockTestOfferings: TestOffering[] = [
  // Centre 1 offerings
  { id: '1', centerId: '1', testTypeId: '1', practitionerId: '1', cost: 5000, duration: 30, available: true },
  { id: '2', centerId: '1', testTypeId: '2', practitionerId: '2', cost: 45000, duration: 60, available: true },
  { id: '3', centerId: '1', testTypeId: '4', practitionerId: '2', cost: 8000, duration: 20, available: true },
  { id: '4', centerId: '1', testTypeId: '8', practitionerId: '5', cost: 15000, duration: 30, available: true },
  
  // Centre 2 offerings
  { id: '5', centerId: '2', testTypeId: '1', practitionerId: '1', cost: 5500, duration: 30, available: true },
  { id: '6', centerId: '2', testTypeId: '3', practitionerId: '2', cost: 50000, duration: 45, available: true },
  { id: '7', centerId: '2', testTypeId: '5', practitionerId: '3', cost: 12000, duration: 30, available: true },
  { id: '8', centerId: '2', testTypeId: '6', practitionerId: '4', cost: 7000, duration: 30, available: true },
  
  // Centre 3 offerings
  { id: '9', centerId: '3', testTypeId: '1', practitionerId: '5', cost: 4800, duration: 30, available: true },
  { id: '10', centerId: '3', testTypeId: '2', practitionerId: '3', cost: 42000, duration: 60, available: true },
  { id: '11', centerId: '3', testTypeId: '7', practitionerId: '5', cost: 6000, duration: 20, available: true },
  
  // Centre 4 offerings
  { id: '12', centerId: '4', testTypeId: '4', practitionerId: '6', cost: 7500, duration: 20, available: true },
  { id: '13', centerId: '4', testTypeId: '6', practitionerId: '4', cost: 6500, duration: 30, available: true },
  { id: '14', centerId: '4', testTypeId: '8', practitionerId: '5', cost: 14000, duration: 30, available: true },
  
  // Centre 5 offerings
  { id: '15', centerId: '5', testTypeId: '1', practitionerId: '1', cost: 5200, duration: 30, available: true },
  { id: '16', centerId: '5', testTypeId: '5', practitionerId: '3', cost: 11000, duration: 30, available: true },
  { id: '17', centerId: '5', testTypeId: '7', practitionerId: '5', cost: 5800, duration: 20, available: true },
];

