import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material';

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
  action: string;

  userFormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required)
  });

  constructor(
    private userService: UserService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit() {
    console.log(this.data);
    this.action = 'Add';
    if (this.data) {
      this.action = 'Edit';
      this.userFormGroup.patchValue(this.data);
    }
  }

  submitForm() {
    console.log('Form Submitted ...!!!');
    console.log(this.userFormGroup.value);
    this.loading = true;


    // Add User

    if (this.userFormGroup.value.id == null) {

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

    } else {



      this.userService.editUser(this.userFormGroup.value).subscribe((result) => {

        if (result.affectedRows > 0) {

          this.messageObj.status = true;
          this.messageObj.type = 'success';
          this.messageObj.message = 'User has been updated successfully!';

          this.loading = false;
          this.form.resetForm();
        } else {

          this.messageObj.status = true;
          this.messageObj.type = 'error';
          this.messageObj.message = 'User cannot be updated this time ';

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

}
