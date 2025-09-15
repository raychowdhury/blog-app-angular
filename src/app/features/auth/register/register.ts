import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  ReactiveFormsModule, 
  FormGroup, 
  FormControl, 
  Validators, 
  AbstractControl, 
  ValidationErrors 
} from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class Register {
  private snackBar = inject(MatSnackBar);

  registerForm = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z]).+$/)
    ]),
    confirmPassword: new FormControl('', [Validators.required])
  }, { validators: Register.passwordMatchValidator });

  static passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const form = control as FormGroup;
    const password = form.get('password')?.value;
    const confirm = form.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const formData = this.registerForm.value;

      // 1️⃣ Load existing users
      const users = JSON.parse(localStorage.getItem('blogapp/users') || '[]');

      // 2️⃣ Create new user with extra fields
      const newUser = {
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        joinDate: new Date().toISOString(),                 // 👈 auto add join date
        profilePicture: 'https://via.placeholder.com/150'   // 👈 default pic
      };

      // 3️⃣ Save user
      users.push(newUser);
      localStorage.setItem('blogapp/users', JSON.stringify(users));

      // 4️⃣ Also save to auth (auto login after register)
      localStorage.setItem('blogapp/auth', JSON.stringify(newUser));

      console.log("✅ User saved:", newUser);

      this.snackBar.open('Registration successful 🎉', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

      this.registerForm.reset();
    } else {
      this.registerForm.markAllAsTouched();
      this.snackBar.open('Please fix the errors in the form ❌', 'Close', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }
}
