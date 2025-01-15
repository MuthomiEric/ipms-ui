import { Component } from '@angular/core';
import { InsurancePolicyService } from '../../services/insurance-policy.service';
import { InsurancePolicyDto } from '../../models/insurance-policy.model';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { CommonModule } from '@angular/common'; 
import { RouterModule } from '@angular/router'; 

@Component({
  selector: 'app-create-policy',
  templateUrl: './create-policy.component.html',
  styleUrls: ['./create-policy.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule]  
})
export class CreatePolicyComponent {
  policy: InsurancePolicyDto = { 
    id:'',
    policyHolderName: '', 
    policyNumber: '', 
    premium: 0, 
    startDate: new Date()
  };
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private policyService: InsurancePolicyService, private router: Router) {}

  onSubmit() {
    if (this.policy.startDate && !this.policy.endDate) {
      const endDate = new Date(this.policy.startDate);
      endDate.setFullYear(endDate.getFullYear() + 1);  
      this.policy.endDate = endDate;
    }

    this.policyService.createPolicy(this.policy).subscribe({
      next: () => {
        this.successMessage = 'Policy created successfully!';
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = 'Failed to create policy. Please try again.';
        console.error(error);
      }
    });
  }
}
