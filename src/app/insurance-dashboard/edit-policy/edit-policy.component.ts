import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InsurancePolicyService } from '../../services/insurance-policy.service';
import { InsurancePolicy } from '../../models/insurance-policy.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-edit-policy',
  templateUrl: './edit-policy.component.html',
  styleUrls: ['./edit-policy.component.scss'],
  standalone: true,
  imports: [CommonModule,FormsModule]
})
export class EditPolicyComponent implements OnInit {
  policy: InsurancePolicy | null = null;
  errorMessage: string = '';
  isLoading: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private policyService: InsurancePolicyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isLoading = true;
      this.policyService.getPolicy(id).subscribe({
        next: (data) => {
          this.policy = data;
          this.isLoading = false;
        },
        error: (error) => {
          this.errorMessage = 'Failed to load policy details.';
          console.error(error);
          this.isLoading = false;
        }
      });
    }
  }

  onSubmit(): void {
    if (this.policy) {
      this.isLoading = true;
      this.policyService.updatePolicy(this.policy.id, this.policy).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']); 
        },
        error: (error) => {
          this.errorMessage = 'Failed to update the policy.';
          console.error(error);
          this.isLoading = false;
        }
      });
    }
  }
}
