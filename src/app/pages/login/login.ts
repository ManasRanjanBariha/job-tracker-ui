import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth/auth-service';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../service/toast/toast-service';
import { StorageService } from '../../service/storage/storage-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  activeTab: 'login' | 'register' = 'login';
  toastService = inject(ToastService);
  storageService = inject(StorageService);
  router = inject(Router);
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

  ngOnInit() {
    const user = this.storageService.get('user');
    if (user) {
      this.router.navigate(['/dashboard']);
    }
  }

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


  doLogin() {
    console.log('Attempting login with:', this.login);
    this.hideAll();

    if (!this.email || !this.password) {
     
      this.toastService.error('Please fill in all fields.');
      return;
    }
    this.authService.login(this.email, this.password).then(response => {
      if (response.user) {
        this.storageService.setWithExpiry('accessToken', response.accessToken, 3600000); // 1 hour
        this.storageService.setWithExpiry('refreshToken', response.refreshToken, 86400000); // 24 hours
        this.storageService.setWithExpiry('user', response.user, 86400000);
        this.banners.loginOk = true;
        this.router.navigate(['/dashboard']);

      }
      else {
        this.toastService.error(response.message || 'Login failed.');
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
      this.toastService.error('Please fill in all fields.');
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!emailOk) {
      this.toastService.error("Please enter correct email");
      return;
    }
    if(pass.length < 8 || pass !== pass2)
    {
      this.toastService.error("Please enter strong password");
    }
    if(!terms)
    {
      this.toastService.error("please accept term & condition")
    }

    this.authService.register(fname, lname, email, pass).then(response => {
      if (response.user) {
        this.toastService.success('Registration successful!');
        this.storageService.setWithExpiry('accessToken', response.accessToken, 3600000); // 1 hour
        this.storageService.setWithExpiry('refreshToken', response.refreshToken, 86400000);
        this.storageService.setWithExpiry('user', response.user, 86400000);
        this.router.navigate(['/dashboard']);
      } else {
        this.toastService.error(response.message || 'Registration failed.');
      }
    });
    
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
