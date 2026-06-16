export type PractitionerGender = 'male' | 'female' | 'any';

type Address = {
  street: string;
  city: string;
  state: string;
  country: string
}

type Contact = {
  email: string;
  phone: string[];
}

export type Test_Price = {
  test_type: string;
  price: number;
}

export interface DiagnosticCentre {
  diagnostic_centre_id: string;
  diagnostic_centre_name: string;
  address: Address;
  contact: Contact;
  doctors: string[]
  test_prices: Test_Price[]
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  admin_id?: string;
  availability?: string;
  archived?: boolean;
  rating?: number;
}

type Pagination = {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}

export interface CentreResult {
  data: {
    result: DiagnosticCentre[];
    pagination: Pagination
  };
  status: number;
  success: boolean;
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

export interface CenterWithDistance extends DiagnosticCentre {
  distance: number; // in km
  availableTests: TestOfferingWithDetails[];
}

export interface TestOfferingWithDetails extends TestOffering {
  testType: TestType;
  practitioner: Practitioner;
  center: DiagnosticCentre;
}

export interface PaymentIntent {
  id: string;
  bookingId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'failed';
}

