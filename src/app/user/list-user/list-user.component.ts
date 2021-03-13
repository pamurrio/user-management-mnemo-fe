import { Search } from './../../model/search.model';
import { Component, OnInit , Inject} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {Router} from "@angular/router";
import {User} from "../../model/user.model";
import {ApiService} from "../../service/api.service";
import { Group } from 'src/app/model/group.model';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  users: User[];
  searchData: Search;
  searchForm: FormGroup;
  groups: Group[];
  constructor(private router: Router, private apiService: ApiService,private formBuilder: FormBuilder) {
    this.users = [];
    this.searchForm = this.formBuilder.group({});
    this.searchData = new Search();
    this.groups = [];
   }

  ngOnInit() {

    this.apiService.findPageAndSortAndFilterUser(this.searchData)
      .subscribe( data => {
        this.users = data.content;
      });
    this.apiService.findAllGroup().subscribe(data => {
      this.groups = data;
    });
  }

  deleteUser(user: User): void {
    this.apiService.deleteUser(user.id)
      .subscribe( data => {
        this.apiService.findPageAndSortAndFilterUser(this.searchData)
        .subscribe( data => {
          this.users = data.content;
        });
      })
  };

  editUser(user: User): void {
    window.localStorage.removeItem("editUserId");
    window.localStorage.setItem("editUserId", String((user.id)));
    this.router.navigate(['edit-user']);
  };

  addUser(): void {
    this.router.navigate(['add-user']);
  };


  onSearch(): void {
    this.apiService.findPageAndSortAndFilterUser(this.searchData)
    .subscribe( data => {
      this.users = data.content;
    });
  }
}
