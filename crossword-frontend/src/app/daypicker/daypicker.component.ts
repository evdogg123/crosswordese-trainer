import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-daypicker',
  templateUrl: './daypicker.component.html',
  styleUrls: ['./daypicker.component.scss'],
})
export class DaypickerComponent implements OnInit {
  @Output() dayPickEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit() { }


  selectDay(day) {
    console.log('book in ChildComponent:', day);
    this.dayPickEvent.emit(day);
  }
}
