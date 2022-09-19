import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthForm, AuthRequest, Role} from "../../model/IAuth";
import {tap} from "rxjs";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2';
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  formField: typeof AuthForm = AuthForm;
  showPassword: boolean = false;

  constructor(private readonly service: AuthService,
              private readonly router: Router,
              private readonly titleService: Title) {
    titleService.setTitle('Enigma Loan | Login')
  }


  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    const {email, password} = this.formField;
    this.form = new FormGroup({
      [email]: new FormControl(null, [Validators.required, Validators.email]),
      [password]: new FormControl(null, [Validators.required, Validators.min(6)])
    })
  }

  onSubmit(): void {
    const data: AuthRequest = this.form.value;

    this.service.login(data).pipe(
      tap(({data}) => {
        this.service.storeUser(data);
      }),
    ).subscribe({
      next: ({data}) => {
        this.clearForm();
        if (data.role === Role.ADMIN) {
          Swal.fire({
            icon: 'success',
            title: 'Login Success',
            text: `Welcome ${data.email}`
          }).then(() => this.router.navigateByUrl('/dashboard'))
          return;
        }
        Swal.fire({
          icon: 'success',
          title: 'Login Success',
          text: `Welcome ${data.email}`
        }).then(() => this.router.navigateByUrl('/'))      },
      error: (err) => Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.error.message
      }),
    })
  }

  clearForm(): void {
    this.form.reset();
  }


  toggleChecked(e: any) {
    this.showPassword = e.target.checked
  }
}
