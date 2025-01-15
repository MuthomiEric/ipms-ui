import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { InsurancePolicyService } from '../../services/insurance-policy.service';
import { InsurancePolicy } from '../../models/insurance-policy.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-view-policy',
  templateUrl: './view-policy.component.html',
  styleUrls: ['./view-policy.component.scss'],
  standalone: true,
  imports: [CommonModule] 
})
export class ViewPolicyComponent implements OnInit {
  policy: InsurancePolicy | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private policyService: InsurancePolicyService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {  
      this.policyService.getPolicy(idParam).subscribe({
        next: (data) => {
          this.policy = data;
        },
        error: (error) => {
          this.errorMessage = 'Failed to fetch policy details.';
          console.error(error);
        }
      });
    } else {
      this.errorMessage = 'Invalid policy ID.';
    }
  }
}
