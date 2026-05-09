export type PractitionerGender = 'male' | 'female' | 'any';

export interface DiagnosticCenter {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  rating: number;
  imageUrl?: string;
}

export interface TestType {
  id: string;
  name: string;
  description: string;
  category: string;
}

export interface Practitioner {
  id: string;
  name: string;
  gender: PractitionerGender;
  specialization: string;
  yearsOfExperience: number;
}

export interface TestOffering {
  id: string;
  centerId: string;
  testTypeId: string;
  practitionerId: string;
  cost: number;
  duration: number; // in minutes
  available: boolean;
}

export interface TimeSlot {
  id: string;
  startTime: string; // ISO format
  endTime: string; // ISO format
  available: boolean;
}

export interface Booking {
  id: string;
  centerId: string;
  testOfferingId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  createdAt: string;
  userId?: string;
}

export interface SearchFilters {
  testType?: string;
  practitionerGender?: PractitionerGender;
  maxCost?: number;
  maxDistance?: number; // in km
}

export interface CenterWithDistance extends DiagnosticCenter {
  distance: number; // in km
  availableTests: TestOfferingWithDetails[];
}

export interface TestOfferingWithDetails extends TestOffering {
  testType: TestType;
  practitioner: Practitioner;
  center: DiagnosticCenter;
}

export interface PaymentIntent {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
}

