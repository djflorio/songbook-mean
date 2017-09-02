import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/User';
import { Router } from '@angular/router';

import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  signupForm: FormGroup;
  private newUser: User;

  constructor(private router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.signupForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
      passwords: this.fb.group({
        password: ['', ([Validators.minLength(8), Validators.required])],
        confirmPass: ['', Validators.required]
      }, {validator: this.checkPasswords})
    });
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.password.value;
    let confirmPass = group.controls.confirmPass.value;

    return pass === confirmPass ? null : { notSame: true }
  }

  public onSubmit({ value, valid }: { value: any, valid: boolean }) {
    this.newUser = {
      username: value.username,
      email: value.email,
      password: value.passwords.password
    }
    this.userService.create(this.newUser)
      .subscribe(
        data => {
          this.router.navigate(['/login']);
        },
        error => {
          console.log("ERROR");
        }
      );
  }

  get username() { return this.signupForm.get('username'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('passwords.password'); }
  get confirmPassword() { return this.signupForm.get('passwords.confirmPass'); }


}
