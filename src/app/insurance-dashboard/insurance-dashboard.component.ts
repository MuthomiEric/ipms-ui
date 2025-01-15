import { Component, OnInit } from '@angular/core';
import { InsurancePolicyService } from '../services/insurance-policy.service';
import { InsurancePolicy } from '../models/insurance-policy.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-insurance-dashboard',
  templateUrl: './insurance-dashboard.component.html',
  styleUrls: ['./insurance-dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule] 
})
export class InsuranceDashboardComponent implements OnInit {
  policies: InsurancePolicy[] = [];
  errorMessage: string | null = null;
  totalPages: number=1;
  isLoading = false;
  pageNumber = 1;
  pageSize = 5;

  constructor(private policyService: InsurancePolicyService, private router: Router) {}

  ngOnInit(): void {
    this.loadPolicies();
  }

  loadPolicies(): void {
    this.isLoading = true;
    this.policyService.getPolicies(this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.totalPages = response.totalPages;
        this.policies = response.data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load policies.';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  onEditPolicy(policyId: string): void {
    this.router.navigate(['/edit-policy', policyId]);
  }

  onDeletePolicy(policyId: string): void {
    if (confirm('Are you sure you want to delete this policy?')) {
      this.policyService.deletePolicy(policyId).subscribe({
        next: () => {
          this.policies = this.policies.filter((p) => p.id !== policyId);
        },
        error: (error) => {
          this.errorMessage = 'Failed to delete the policy.';
          console.error(error);
        }
      });
    }
  }

  onViewPolicy(policyId: string): void {
    this.router.navigate(['/view-policy', policyId]);
  }

  onCreatePolicy(): void {
    this.router.navigate(['/create-policy']);
  }
  onChange() {
    this.loadPolicies(); // Call fetchPolicies whenever the page number changes
  }
}
