import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
@Component({
  selector: 'app-session-generator',
  templateUrl: './session-generator.page.html',
  styleUrls: ['./session-generator.page.scss'],
})
export class TrainingGeneratorPage implements OnInit {
  ionicForm: FormGroup;
  constructor(public formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      length: ['', [Validators.required]],
      diversity: ['', [Validators.required]],
      puzzles: [[], [Validators.required]],
    })
  }
  submitForm() {
    console.log(this.ionicForm.value);
    let formData = this.ionicForm.value;
    console.log(formData.puzzles)
    if (typeof formData.puzzles == 'string') {
      console.log(formData)
      formData.puzzles = [formData.puzzles]
    }
    this.router.navigateByUrl('/session', { state: formData });
  }


  selectDay(selectedDay: string) {
    let payload = { puzzles: [selectedDay], diversity: "low", numProblems: 75 }
    this.router.navigateByUrl('/session', { state: payload });
  }
}
