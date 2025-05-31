import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface BarangayInfo {
  name: string;
  captain: string;
  contact: string;
  hours: string;
}

interface UserProfile {
  name: string;
  address: string;
  verified: boolean;
}

interface Service {
  name: string;
  description: string;
  status: string;
  icon: string;
  color: string;
}

interface QuickAction {
  name: string;
  icon: string;
  type: string;
}

interface Announcement {
  title: string;
  content: string;
  category: string;
  date: Date;
}

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  
  currentBarangay: BarangayInfo = {
    name: 'Barangay San Antonio',
    captain: 'Hon. Maria Santos',
    contact: '+63 912 345 6789',
    hours: 'Mon-Fri 8:00 AM - 5:00 PM'
  };

  userProfile: UserProfile = {
    name: 'Juan Dela Cruz',
    address: '123 Rizal St., Barangay San Antonio',
    verified: true
  };

  services: Service[] = [
    {
      name: 'Barangay ID',
      description: 'Official identification card',
      status: 'Ready for Pickup',
      icon: 'fas fa-id-card',
      color: 'text-success'
    },
    {
      name: 'Clearance',
      description: 'Barangay clearance certificate',
      status: 'Processing',
      icon: 'fas fa-certificate',
      color: 'text-warning'
    },
    {
      name: 'Indigency',
      description: 'Certificate of indigency',
      status: 'Available',
      icon: 'fas fa-file-alt',
      color: 'text-info'
    },
    {
      name: 'Residency',
      description: 'Certificate of residency',
      status: 'Available',
      icon: 'fas fa-home',
      color: 'text-primary'
    }
  ];

  quickActions: QuickAction[] = [
    { name: 'New Complaint', icon: 'fas fa-exclamation-triangle', type: 'complaint' },
    { name: 'Request ID', icon: 'fas fa-id-card', type: 'id' },
    { name: 'Get Clearance', icon: 'fas fa-certificate', type: 'clearance' },
    { name: 'Schedule Appointment', icon: 'fas fa-calendar', type: 'appointment' }
  ];

  announcements: Announcement[] = [
    {
      title: 'Free Medical Check-up',
      content: 'Free medical check-up available at the barangay health center this Saturday.',
      category: 'Health',
      date: new Date('2024-01-15')
    },
    {
      title: 'Community Clean-up Drive',
      content: 'Join us for the monthly community clean-up drive this Sunday at 6 AM.',
      category: 'Environment',
      date: new Date('2024-01-12')
    },
    {
      title: 'New Online Services',
      content: 'Several barangay services are now available online through BarangayNav.',
      category: 'Technology',
      date: new Date('2024-01-10')
    }
  ];

  ngOnInit(): void {
    // Initialize component
  }

  getStatusBadge(status: string): string {
    const statusMap: { [key: string]: string } = {
      'Ready for Pickup': 'bg-success',
      'Processing': 'bg-warning',
      'Available': 'bg-info',
      'Completed': 'bg-primary',
      'Rejected': 'bg-danger'
    };
    return statusMap[status] || 'bg-secondary';
  }

  requestService(serviceType: string): void {
    switch(serviceType) {
      case 'complaint':
        alert('Opening complaint form...');
        break;
      case 'id':
        alert('Opening ID request form...');
        break;
      case 'clearance':
        alert('Opening clearance request form...');
        break;
      case 'appointment':
        alert('Opening appointment scheduler...');
        break;
      default:
        alert('Service not available yet.');
    }
  }
}
