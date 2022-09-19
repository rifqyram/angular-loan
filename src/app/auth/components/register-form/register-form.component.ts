import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthForm, AuthRequest} from "../../model/IAuth";
import {AuthService} from "../../service/auth.service";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import Swal from "sweetalert2";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent implements OnInit {
  form!: FormGroup;
  formField: typeof AuthForm = AuthForm;
  showPassword: boolean = false;


  constructor(private readonly service: AuthService,
              private readonly router: Router,
              private readonly titleService: Title) {
    titleService.setTitle('Enigma Loan | Register')
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
    this.service.register(data)
      .subscribe({
        next: (val) => {
          this.clearForm();
          Swal.fire({
            icon: 'success',
            title: 'Successfully Register',
          }).then(() => this.router.navigateByUrl('/login'))
        },
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

  toggleChecked(event: any) {
    this.showPassword = event.target.checked;
  }
}
