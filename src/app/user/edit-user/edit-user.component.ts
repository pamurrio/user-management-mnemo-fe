import { ApiResponse } from './../../model/api.response';
import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {first} from "rxjs/operators";
import {User} from "../../model/user.model";
import {ApiService} from "../../service/api.service";
import { Group } from 'src/app/model/group.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  user: User;
  editForm: FormGroup;
  groups: Group[];
  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) {
    this.user = new User();
    this.editForm = this.formBuilder.group({});
    this.groups = [];
  }

  ngOnInit() {
    let userId = window.localStorage.getItem("editUserId");
    if(!userId) {
      alert("Invalid action.")
      this.router.navigate(['list-user']);
      return;
    }
    this.apiService.findAllGroup().subscribe(data => {
      this.groups = data;
    });
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      code: ['', Validators.required],
      group: ['', Validators.required]
    });
    this.apiService.getUserById(+userId)
      .subscribe( data => {
        this.editForm.setValue(this.mapForm((data)));
        this.editForm.value
      });
  }

  private mapForm(user: any): any {

    return {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      code: user.code,
      group: user.group?.id

    };
  }

  onSubmit() {
    if(this.editForm.valid){
      let userDto: User = this.editForm.value;
      let groupDto: Group = new Group(this.editForm.value.group);
      userDto.code = undefined;
      userDto.group = groupDto;
      this.apiService.updateUser(userDto)
        .pipe(first())
        .subscribe(
          data => {
            /*if(data.status === 200) {
              alert('User updated successfully.');
              this.router.navigate(['list-user']);
            }else {
              alert(data.message);
            }*/
            alert('User updated successfully.');
            this.router.navigate(['list-user']);
          },
          error => {
            alert(error);
          });
    }
  }

}
