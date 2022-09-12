import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthForm, AuthRequest} from "../../model/IAuth";
import {AuthService} from "../../service/auth.service";
import {finalize} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  form!: FormGroup;
  formField: typeof AuthForm = AuthForm;
  loading: boolean = false;
  hidePassword: boolean = true;

  constructor(private readonly service: AuthService, private router: Router) {
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
    this.service.register(data)
      .pipe(finalize(() => this.loading = false))
      .subscribe({
        next: async (val) => {
          console.log(val)
          this.clearForm();
          await this.router.navigateByUrl('/login');
        },
        error: (err) => console.log(err),
      })
  }

  clearForm(): void {
    this.form.reset();
  }

}
