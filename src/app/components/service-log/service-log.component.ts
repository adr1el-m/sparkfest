import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ServiceRecord {
  requestId: string;
  name: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  dateRequested: Date;
  estimatedCompletion: Date;
  actualCompletion?: Date;
}

@Component({
  selector: 'app-service-log',
  imports: [CommonModule, FormsModule],
  templateUrl: './service-log.component.html',
  styleUrl: './service-log.component.css'
})
export class ServiceLogComponent implements OnInit {
  
  services: ServiceRecord[] = [];
  filteredServices: ServiceRecord[] = [];
  selectedFilter: string = 'all';

  ngOnInit(): void {
    this.loadServiceHistory();
    this.filterServices();
  }

  private loadServiceHistory(): void {
    // Mock service data
    this.services = [
      {
        requestId: 'BRG-2024-001',
        name: 'Barangay Clearance',
        description: 'Certificate of good moral character for employment',
        status: 'completed',
        dateRequested: new Date('2024-01-10'),
        estimatedCompletion: new Date('2024-01-12'),
        actualCompletion: new Date('2024-01-11')
      },
      {
        requestId: 'BRG-2024-002',
        name: 'Barangay ID',
        description: 'Official barangay identification card',
        status: 'processing',
        dateRequested: new Date('2024-01-15'),
        estimatedCompletion: new Date('2024-01-22')
      },
      {
        requestId: 'BRG-2024-003',
        name: 'Noise Complaint',
        description: 'Filed complaint against loud music from neighbor',
        status: 'processing',
        dateRequested: new Date('2024-01-18'),
        estimatedCompletion: new Date('2024-01-23')
      },
      {
        requestId: 'BRG-2024-004',
        name: 'Certificate of Indigency',
        description: 'Financial assistance eligibility certificate',
        status: 'pending',
        dateRequested: new Date('2024-01-20'),
        estimatedCompletion: new Date('2024-01-25')
      },
      {
        requestId: 'BRG-2023-045',
        name: 'Business Permit',
        description: 'Barangay endorsement for sari-sari store',
        status: 'completed',
        dateRequested: new Date('2023-12-15'),
        estimatedCompletion: new Date('2023-12-20'),
        actualCompletion: new Date('2023-12-18')
      }
    ];
  }

  filterServices(): void {
    if (this.selectedFilter === 'all') {
      this.filteredServices = [...this.services];
    } else {
      this.filteredServices = this.services.filter(
        service => service.status === this.selectedFilter
      );
    }
  }

  getStatusBadge(status: string): string {
    const statusMap: { [key: string]: string } = {
      'pending': 'bg-warning text-dark',
      'processing': 'bg-info',
      'completed': 'bg-success',
      'cancelled': 'bg-danger'
    };
    return statusMap[status] || 'bg-secondary';
  }

  getMarkerClass(status: string): string {
    const markerMap: { [key: string]: string } = {
      'pending': 'timeline-marker-warning',
      'processing': 'timeline-marker-info',
      'completed': 'timeline-marker-success',
      'cancelled': 'timeline-marker-danger'
    };
    return markerMap[status] || 'timeline-marker-secondary';
  }

  getStatusIcon(status: string): string {
    const iconMap: { [key: string]: string } = {
      'pending': 'fas fa-clock',
      'processing': 'fas fa-spinner',
      'completed': 'fas fa-check',
      'cancelled': 'fas fa-times'
    };
    return iconMap[status] || 'fas fa-question';
  }

  getProgressBarClass(status: string): string {
    const progressMap: { [key: string]: string } = {
      'pending': 'bg-warning',
      'processing': 'bg-info',
      'completed': 'bg-success',
      'cancelled': 'bg-danger'
    };
    return progressMap[status] || 'bg-secondary';
  }

  getProgress(status: string): number {
    const progressMap: { [key: string]: number } = {
      'pending': 25,
      'processing': 75,
      'completed': 100,
      'cancelled': 0
    };
    return progressMap[status] || 0;
  }

  trackService(requestId: string): void {
    alert(`Tracking service: ${requestId}\n\nThis would open detailed tracking information with real-time updates from the barangay office.`);
  }

  contactOffice(requestId: string): void {
    alert(`Follow-up for service: ${requestId}\n\nThis would connect you directly with the barangay office for status updates.`);
  }
}
