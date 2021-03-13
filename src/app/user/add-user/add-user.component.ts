import { Group } from './../../model/group.model';
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ApiService} from "../../service/api.service";
import { User } from 'src/app/model/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  addForm: FormGroup;
  groups: Group[];

  constructor(private formBuilder: FormBuilder,private router: Router, private apiService: ApiService) {
    this.addForm = this.formBuilder.group({});
    this.groups = [];
  }
  ngOnInit() {
     this.apiService.findAllGroup().subscribe(data => {
       this.groups = data;
     });
    this.addForm = this.formBuilder.group({
      id: [],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      code: ['', Validators.required],
      group: ['', Validators.required]
    });

  }

  onSubmit() {
    if(this.addForm.valid){
     let userDto: User = this.addForm.value;
     let groupDto: Group = new Group(this.addForm.value.group);
     userDto.group = groupDto;
      this.apiService.createUser(userDto)
      .subscribe( data => {
        this.router.navigate(['list-user']);
      },
      (ex:HttpErrorResponse) => {
        alert(ex.error.message);
      });
      return;
    }
    alert("Is required all field");
  }

}
