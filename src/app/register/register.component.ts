import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { RegistrationDto } from '../models/auth.models';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true, 
  imports: [FormsModule, CommonModule] 
})
export class RegisterComponent {
  registerDto: RegistrationDto = { firstName: '', lastName: '', email: '', password: '' };
  errorMessage: string | null = null;
  isLoading: boolean = false; // To manage loading state

  constructor(private authService: AuthService, private router: Router) {}

  onRegister() {
    console.log('Registration started');
    this.isLoading = true; // Set loading state to true
    this.errorMessage = null; // Reset any previous error messages

    this.authService.register(this.registerDto).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token); // Store token
        this.router.navigate(['/dashboard']); 
        this.isLoading = false; // Reset loading state
      },
      error: (error) => {
        if (typeof error.error === 'string') {
          this.errorMessage = error.error; 
        } else {
          this.errorMessage = 'Registration failed. Please try again.';
        }
        this.isLoading = false; // Reset loading state
        console.log('isLoading after error:', this.isLoading);
      }
    });
  }
}
