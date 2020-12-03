
import { Component, OnInit } from '@angular/core';
import { Logs } from 'src/app/models/logs';
import { LogsService } from 'src/app/services/logs.service';

@Component({
  selector: 'app-exercise-log',
  templateUrl: './exercise-log.component.html',
  styleUrls: ['./exercise-log.component.css']
})
export class ExerciseLogComponent implements OnInit {
  pageTitle = 'Welcome to Exercise Log Tracker';
  subTitle = 'Average Exercise Distance is ';
  newLog: Logs = new Logs();
  editLog: Logs = null;
  logs: Logs[] = [];
  selected: Logs = null;
  display = true;

  constructor(private logService: LogsService) { }

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.logService.index().subscribe(
      (data) => {
        this.logs = data;
      },
      (err) => {
          console.error("List not found.");
      }
    );
  }

  getAverageDistance(): number {
    let averageDistance = 0;
    let count = 0;
    for(let i = 0; i < this.logs.length; i++){
      if(this.logs[i].enabled == 1){
        averageDistance += this.logs[i].distance;
        count ++;
      }
    }
    return Math.round(((averageDistance/count)+ Number.EPSILON)*100)/100;
  }

  displayLog(log: Logs): void {
    this.display = false;
    this.selected = log;
    this.logService.showLog(log.logId).subscribe(
      (data) => {
        this.newLog = data;
      },
      (err) => {
        console.error("Log not found.")
      }
    )
  }

  displayTable(): void{
    this.display = false;
    this.selected = null;
  }

  // reload(): void{
  //   this.logService.index().subscribe(
  //     todos => {
  //       this.logs = logs;
  //     },
  //     fail => {
  //       console.error("TodoListComponent.reload(): error getting todos");
  //       console.error(fail);
  //     }
  //     );
  //   }

  addLog(log: Logs):void {
    this.logService.create(log).subscribe(
      (data) =>{
        this.newLog = new Logs();
        this.loadLogs();
      },
      (err) => {
        console.error('ExerciseLogComponent.addLog(): error creating log');
        console.error(err);
      }
    );
  }

  setEditLog(){
    this.editLog = Object.assign({}, this.selected);
  }

  updateLog(log){
    this.logService.update(log).subscribe(
      (data) => {
        this.editLog=null;
        this.loadLogs();
        this.selected = data;
      },
      (err) => {
        console.error('ExerciseLogComponent.updateLog(): error updating log.');
        console.error(err);
      }
    );
  }

  deleteLog(id: Number): void{
    this.logService.destroy(id).subscribe(
      (data) => {
        this.editLog = null;
        this.selected = null;
        this.loadLogs();
      },
      (err) => {
        console.error('ExerciseLogComponent.deleteLog(): error deleting log.');
        console.error(err);
      }
    );
  }
}
