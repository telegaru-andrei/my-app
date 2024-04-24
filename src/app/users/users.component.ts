import { Component, OnInit, ViewChild } from '@angular/core';
import User from '../types/User';
import { UsersService } from '../users.service';
import {MatTableModule, MatTable} from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatTooltipModule} from '@angular/material/tooltip';
import { DeleteUserDialogComponent } from '../delete-user-dialog/delete-user-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [MatTableModule, MatButtonModule, MatDividerModule, MatIconModule, MatTooltipModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent implements OnInit{

  users: User[] = [];

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'age', 'email', 'password', 'button'];
  dataSource = this.users;

  ngOnInit() {
    this.usersService.getUsers().subscribe((data) => {
      this.users = data;
      this.dataSource = data;
    });
    
  }
  public deleteUser(id: number) {
    // console.log(id);
    this.usersService.deleteUser(id).subscribe((data) => {
      this.usersService.getUsers().subscribe((data) => {
        this.users = data;
        this.dataSource = data;
      })
    });
  }
  
  constructor(private usersService: UsersService, private dialog: MatDialog){}

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string, id: number): void {

    const dialogRef = this.dialog.open(DeleteUserDialogComponent, {
      width: '250px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == true) {
        this.deleteUser(id);
      }
    });
  }
}
