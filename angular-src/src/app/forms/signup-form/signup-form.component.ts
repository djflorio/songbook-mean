import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/User';

import { SignupService } from '../../services/signup.service';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.css']
})
export class SignupFormComponent implements OnInit {

  signupForm: FormGroup;
  private newUser: User;

  constructor(private fb: FormBuilder, private signupServ: SignupService) {
    
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

  ngOnInit() {
    this.createForm();
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
    console.log(value);
    this.signupServ.addUser(this.newUser).subscribe(
      response => {
        console.log(response);
        if (response.success == true)
          console.log("GOOD");
      }
    )
  }

  get username() { return this.signupForm.get('username'); }
  get email() { return this.signupForm.get('email'); }
  get password() { return this.signupForm.get('passwords.password'); }
  get confirmPassword() { return this.signupForm.get('passwords.confirmPass'); }


}
