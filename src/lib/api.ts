import {
  Booking,
  CenterWithDistance,
  DiagnosticCenter,
  PaymentIntent,
  PractitionerGender,
  SearchFilters,
  TestOffering,
  TestOfferingWithDetails
} from '@/types';
import { mockCenters, mockPractitioners, mockTestOfferings, mockTestTypes } from './data';
import { calculateDistance } from './utils';

/**
 * Search for diagnostic centers based on location and filters
 */
export async function searchCenters(
  userLat: number,
  userLon: number,
  filters: SearchFilters = {}
): Promise<CenterWithDistance[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  let centers = [...mockCenters];
  let offerings = [...mockTestOfferings];
  
  // Apply filters
  if (filters.testType) {
    offerings = offerings.filter(o => o.testTypeId === filters.testType);
    centers = centers.filter(c => 
      offerings.some(o => o.centerId === c.id && o.available)
    );
  }
  
  if (filters.practitionerGender && filters.practitionerGender !== 'any') {
    const filteredPractitionerIds = mockPractitioners
      .filter(p => p.gender === filters.practitionerGender)
      .map(p => p.id);
    offerings = offerings.filter(o => filteredPractitionerIds.includes(o.practitionerId));
    centers = centers.filter(c => 
      offerings.some(o => o.centerId === c.id && o.available)
    );
  }
  
  if (filters.maxCost) {
    offerings = offerings.filter(o => o.cost <= filters.maxCost!);
    centers = centers.filter(c => 
      offerings.some(o => o.centerId === c.id && o.available)
    );
  }
  
  // Calculate distances and enrich with test offerings
  const centersWithDistance: CenterWithDistance[] = centers.map(center => {
    const distance = calculateDistance(userLat, userLon, center.latitude, center.longitude);
    const centerOfferings = offerings
      .filter(o => o.centerId === center.id && o.available)
      .map(offering => {
        const testType = mockTestTypes.find(t => t.id === offering.testTypeId)!;
        const practitioner = mockPractitioners.find(p => p.id === offering.practitionerId)!;
        
        return {
          ...offering,
          testType,
          practitioner,
          center,
        } as TestOfferingWithDetails;
      });
    
    return {
      ...center,
      distance,
      availableTests: centerOfferings,
    };
  });
  
  // Filter by max distance if specified
  let filtered = centersWithDistance;
  if (filters.maxDistance) {
    filtered = filtered.filter(c => c.distance <= filters.maxDistance!);
  }
  
  // Sort by distance
  return filtered.sort((a, b) => a.distance - b.distance);
}

/**
 * Get test offerings for a specific center
 */
export async function getCenterTestOfferings(centerId: string): Promise<TestOfferingWithDetails[]> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const offerings = mockTestOfferings.filter(o => o.centerId === centerId && o.available);
  
  return offerings.map(offering => {
    const testType = mockTestTypes.find(t => t.id === offering.testTypeId)!;
    const practitioner = mockPractitioners.find(p => p.id === offering.practitionerId)!;
    const center = mockCenters.find(c => c.id === centerId)!;
    
    return {
      ...offering,
      testType,
      practitioner,
      center,
    } as TestOfferingWithDetails;
  });
}

/**
 * Book a test
 */
export async function bookTest(
  testOfferingId: string,
  timeSlot: string,
  patientDetails: {
    name: string;
    email: string;
    phone: string;
  }
): Promise<Booking> {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const booking: Booking = {
    id: `booking-${Date.now()}`,
    centerId: mockTestOfferings.find(o => o.id === testOfferingId)!.centerId,
    testOfferingId,
    patientName: patientDetails.name,
    patientEmail: patientDetails.email,
    patientPhone: patientDetails.phone,
    timeSlot,
    status: 'pending',
    createdAt: new Date().toISOString(),
  };
  
  // In a real app, this would save to a database
  console.log('Booking created:', booking);
  
  return booking;
}

/**
 * Process payment
 */
export async function processPayment(
  bookingId: string,
  amount: number
): Promise<PaymentIntent> {
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simulate payment processing
  const payment: PaymentIntent = {
    id: `payment-${Date.now()}`,
    bookingId,
    amount,
    currency: 'NGN',
    status: 'succeeded', // In real app, this would depend on payment gateway response
  };
  
  console.log('Payment processed:', payment);
  
  return payment;
}

/**
 * Confirm booking (called after successful payment)
 */
export async function confirmBooking(bookingId: string): Promise<Booking> {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // In real app, update booking status in database
  const booking: Booking = {
    id: bookingId,
    centerId: '1',
    testOfferingId: '1',
    patientName: 'Patient',
    patientEmail: 'patient@example.com',
    patientPhone: '+234-123-456-7890',
    timeSlot: new Date().toISOString(),
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  };
  
  return booking;
}

/**
 * Send notification
 */
export async function sendNotification(
  recipient: 'patient' | 'center',
  bookingId: string,
  message: string
): Promise<void> {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  console.log(`Notification sent to ${recipient}:`, message);
  
  // In real app, this would send email/SMS/push notification
}



