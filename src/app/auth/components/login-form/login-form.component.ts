import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthForm, AuthRequest, Role} from "../../model/IAuth";
import {finalize, tap} from "rxjs";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  form!: FormGroup;
  formField: typeof AuthForm = AuthForm;
  loading: boolean = false;

  constructor(private readonly service: AuthService, private readonly router: Router) {
  }


  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    const {email, password} = this.formField;
    this.form = new FormGroup({
      [email]: new FormControl(null, [Validators.required, Validators.email]),
      [password]: new FormControl(null, [Validators.required, Validators.email, Validators.min(6)])
    })
  }

  onSubmit(): void {
    const data: AuthRequest = this.form.value;
    this.loading = true;

    this.service.login(data).pipe(
      tap(({data}) => {
        this.service.storeUser(data);
      }),
      finalize(() => this.loading = false)
    ).subscribe({
      next: async ({data}) => {
        this.clearForm();
        if (data.role === Role.ADMIN) {
          await this.router.navigateByUrl('/dashboard');
          return;
        }
        await this.router.navigateByUrl('/');
      },
      error: (err) => console.log(err),
    })
  }

  clearForm(): void {
    this.form.reset();
  }


}
