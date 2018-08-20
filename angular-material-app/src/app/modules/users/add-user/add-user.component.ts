import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})

export class AddUserComponent implements OnInit {

  @ViewChild('userForm') form;
  loading: boolean;
  messageObj = {
    status: false,
    type: '',
    message: ''
  };

  userFormGroup = new FormGroup({
    name: new FormControl(null, Validators.required)
  });

  constructor(private userService: UserService) { }

  ngOnInit() { }

  submitForm() {
    console.log('Form Submitted ...!!!');
    console.log(this.userFormGroup.value);
    this.loading = true;

    this.userService.addUser(this.userFormGroup.value).subscribe((result) => {
      console.log(result);
      if (result.affectedRows > 0) {

        this.messageObj.status = true;
        this.messageObj.type = 'success';
        this.messageObj.message = 'User has been added successfully!';

        this.loading = false;
        this.form.resetForm();
      } else {

        this.messageObj.status = true;
        this.messageObj.type = 'error';
        this.messageObj.message = 'User cannot be added this time ';

        this.loading = false;
        this.form.resetForm();

      }

      /** Reset Form */
      setTimeout(() => {

        this.messageObj.status = false;
        this.messageObj.type = null;
        this.messageObj.message = null;

      }, 3000);

    });
  }

}
