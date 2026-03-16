import { Component } from '@angular/core';
import { AuthService } from '../../service/auth/auth-service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  activeTab: 'login' | 'register' = 'login';
  banners = {
    loginErr: false,
    loginOk: false,
    regErr: false,
    regOk: false,
    forgotOk: false
  };
  email:string = '';
  password:string = '';
  login = {
    email: '',
    password: ''
  };

  register = {
    fname: '',
    lname: '',
    email: '',
    pass: '',
    pass2: '',
    terms: false
  };
  loading = {
    login: false,
    register: false
  };

  passwordStrength = {
    score: 0,
    label: 'Enter a password',
    color: ''
  };
  isRemember = false;
isTerms = false;
// login
showLoginPass = false;

// register
showRegPass     = false;
showConfirmPass = false;

  constructor(private authService: AuthService) {}

  selectedChips: string[] = [];

  switchTab(tab: 'login' | 'register') {
    this.activeTab = tab;
    console.log('Switched to tab:', tab);
    this.hideAll();
  }

  hideAll() {
    Object.keys(this.banners).forEach(
      k => (this.banners[k as keyof typeof this.banners] = false)
    );
  }

  toggleChip(chip: string) {
    if (this.selectedChips.includes(chip)) {
      this.selectedChips = this.selectedChips.filter(c => c !== chip);
    } else {
      this.selectedChips.push(chip);
    }
  }

  checkStrength(value: string) {

    let score = 0;

    if (value.length >= 8) score++;
    if (/[A-Z]/.test(value)) score++;
    if (/[0-9]/.test(value)) score++;
    if (/[^A-Za-z0-9]/.test(value)) score++;

    const colors = ['', '#ef4444', '#f59e0b', '#6366f1', '#10b981'];
    const labels = [
      'Enter a password',
      'Weak — too simple',
      'Fair — add numbers',
      'Good — almost there',
      'Strong ✓'
    ];

    this.passwordStrength.score = score;
    this.passwordStrength.label = value.length ? labels[score] : labels[0];
    this.passwordStrength.color = colors[score];
  }

  doLogin() {
    console.log('Attempting login with:', this.login);
    this.hideAll();

    if (!this.email || !this.password) {
      this.banners.loginErr = true;
      console.log('Login failed: Missing email or password');
      return;
    }
    this.authService.login(this.email, this.password).then(response => {
      if (response.success) {
        this.banners.loginOk = true;
      }
    });
  

    setTimeout(() => {
      this.loading.login = false;
      this.banners.loginOk = true;
    }, 1400);
  }

  doRegister() {

    this.hideAll();

    const { fname, lname, email, pass, pass2, terms } = this.register;

    if (!fname || !lname || !email || !pass || !pass2) {
      this.banners.regErr = true;
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailOk || pass.length < 8 || pass !== pass2 || !terms) {
      this.banners.regErr = true;
      return;
    }

    this.loading.register = true;

    setTimeout(() => {
      this.loading.register = false;
      this.banners.regOk = true;
    }, 1600);
  }

  doForgot() {

    this.hideAll();

    if (!this.login.email) {
      this.banners.loginErr = true;
      return;
    }

    this.banners.forgotOk = true;
  }

}
