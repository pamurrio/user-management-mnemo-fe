import { Component, OnInit , Inject} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../../model/user.model";
import {ApiService} from "../../service/api.service";

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent implements OnInit {

  public users: User[];

  constructor(private router: Router, private apiService: ApiService) {
    this.users = new Array<User>();
   }

  ngOnInit() {

    this.apiService.findPageAndSortAndFilterUser(new Map())
      .subscribe( data => {
        this.users = data.content;
      });
  }

  deleteUser(user: User): void {
    this.apiService.deleteUser(user.id)
      .subscribe( data => {
        this.users = this.users.filter(u => u !== user);
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
}
