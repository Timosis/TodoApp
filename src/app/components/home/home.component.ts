import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { TodoService } from 'src/app/services/todo.service';
import { DoingService } from 'src/app/services/doing.service';
import { DoneService } from 'src/app/services/done.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  todos = [];
  doings = [];
  dones = [];


  constructor(private toDoService: TodoService,
    private doingService: DoingService,
    private doneService: DoneService,
    private dialog: MatDialog) {
  }

  ngOnInit() {
    this.getAllToDos();
    this.getAllDoings();
    this.getAllDones();
  }

  updateTask(todo, type) {

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.hasBackdrop = true;

    dialogConfig.data = {
      _id: todo._id,
      title: todo.title,
      type: type
    }

    const dialogRef = this.dialog.open(UpdateDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      const obj = {
        _id: result._id,
        title: result.title
      }
      
      switch (result.type) {
        //1 Is For Update TODO; 
        case 1: {
          this.updateToDo(obj);
          break;
        }

        //2 Is For Update DOING; 
        case 2: {
          this.updateDoing(obj);
          break;
        }

        //3 For Update DONE; 
        case 3: {
          this.updateDone(obj);
          break;
        }
        default: {
          break;
        }
      }
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }

    if (event.previousContainer.id == "cdk-drop-list-0" && event.container.id == "cdk-drop-list-1") {

      this.addDoing(event.item.data);
      this.removeToDo(event.item.data._id);

    }

    if (event.previousContainer.id == "cdk-drop-list-1" && event.container.id == "cdk-drop-list-0") {

      this.addToDo(event.item.data);
      this.removeDoing(event.item.data._id);
    }

    if (event.previousContainer.id == "cdk-drop-list-1" && event.container.id == "cdk-drop-list-2") {

      this.addDone(event.item.data);
      this.removeDoing(event.item.data._id);
    }

    if (event.previousContainer.id == "cdk-drop-list-2" && event.container.id == "cdk-drop-list-1") {

      this.addDoing(event.item.data);
      this.removeDone(event.item.data._id);
    }
  }

  //Add A Todo To Todos
  //@params Object
  addToDo(todo) {
    let obj = null;
    if (todo.value) {
      obj = { todo: todo.value };
    }
    else {
      obj = { todo: todo.title };
    }

    this.toDoService.addToDo(obj).subscribe((res) => {
      this.getAllToDos();
      todo.value = '';
    }, (err) => {
      console.log(err);
    });
  }

  //Get All Todos
  getAllToDos() {
    this.toDoService.getAllToDos().subscribe((result) => {
      Object.keys(result).forEach((key) => {
        this.todos[key] = result[key];
      })
    }, (err) => {
      console.log(err);
    }
    );
  }

  // Remove A Task On Todos By Id
  // @param Id
  removeToDo(id) {
    this.toDoService.removeToDo(id).subscribe((result) => {
      this.todos = this.todos.filter(todo => todo._id !== id);
    }, (error) => {
      console.log(error);

    });
  }

  // Update A Task On Todo
  // @param Object
  updateToDo(todo) {
    this.toDoService.updateToDo(todo).subscribe((result) => {
      this.getAllToDos();
    }, (err) => {

    });
  }

  // Get All Doings
  getAllDoings() {
    this.doingService.getAllDoings().subscribe((result) => {
      Object.keys(result).forEach((key) => {
        this.doings[key] = result[key];
      })
    }, (err) => {
      console.log(err);
    });
  }

  // ADD A DOINGS FROM TODO
  // @param Object
  addDoing(doing) {
    this.doingService.addDoings(doing).subscribe((res) => {
      this.getAllDoings();
    }, (err) => {
      console.log(err);
    });
  }

  // Remove A Task From Doings By Task Id
  // @param Id
  removeDoing(id) {
    this.doingService.removeDoings(id).subscribe((res) => {
      this.doings = this.doings.filter(doing => doing._id !== id);
    }, (err) => {
      console.log(err);
    });
  }

  // Update A Task From Doings
  // @param Object
  updateDoing(doing) {
    this.doingService.updateDoing(doing).subscribe((result) => {
      this.getAllDoings();
    }, (err) => {
      console.log(err);
    });
  }


  // Get All Dones
  getAllDones() {
    this.doneService.getAllDones().subscribe((result) => {
      Object.keys(result).forEach((key) => {
        this.dones[key] = result[key];
      })
    }, (err) => {
      console.log(err);
    });
  }

  // Add A Task From Doings To Dones(Drag And Drop)
  // @param Object
  addDone(done) {
    this.doneService.addDone(done).subscribe((res) => {
      this.getAllDoings();
    }, (err) => {
      console.log(err);
    });
  }

  // Remove A Task From Done By Task Id
  // @param id
  removeDone(id) {
    this.dones = this.dones.filter(done => done._id !== id);
    this.doneService.removeDone(id).subscribe((result) => {
    }, (err) => {
      console.log(err);
    });
  }

  //Update A Task On Done 
  //@param Object
  updateDone(updatedDone) {
    this.doneService.updateDone(updatedDone).subscribe((result) => {
      this.getAllDones();
    }, (err) => {
      console.log(err);
    });
  }
}
