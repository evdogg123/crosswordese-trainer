import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-session',
  templateUrl: './session.page.html',
  styleUrls: ['./session.page.scss'],
})
export class SessionPage implements OnInit {

  mostCommonLetters = [
    "E", "A", "R", "I", "O", "T", "N", "S", "L", "C", "U", "D", "P", "M", "H", "G", "B", "F", "Y", "W", "K", "V", "X", "Z", "J", "Q"
  ]
  problemsLeft = 0;
  scoreCts = {
    "correct": 0,
    "correct-with-hint": 0,
    "incorrect": 0
  }
  sessionParams = {};
  problemSet = {}
  currentProblem = {}
  answerLength = 0;
  answer = [];
  curLetterBox = 0;
  explanation = "";
  result = "";
  problemIdx = 0;
  hint = {};
  problemFinished = false;
  constructor(public activatedRoute: ActivatedRoute, private router: Router, private http: HttpClient, private elRef: ElementRef) {

  }



  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe(() => {
      this.sessionParams = this.router.getCurrentNavigation().extras.state;
      console.log(this.sessionParams);

      let queryParams = new HttpParams();
      console.log(this.sessionParams);
      if (!this.sessionParams) {
        this.sessionParams = { length: 'short', diversity: 'high', puzzles: ["Mon"] }
      }
      for (var key in this.sessionParams) {
        queryParams = queryParams.append(key, this.sessionParams[key]);
      }


      this.http.get<any>('http://localhost:3000/problemSet', { params: queryParams }).subscribe(data => {
        console.log(data);
        this.problemSet = data;
        this.problemsLeft = Object.keys(this.problemSet).length;
        this.currentProblem = this.problemSet[0];
        this.setAnswerLength();


      })
    }

    );
  }

  setAnswerLength() {
    this.answerLength = this.currentProblem["Word"].length;
    this.answer = Array(this.answerLength).fill("");

  }

  getScore() {
    let numerator = this.scoreCts["correct"] + this.scoreCts["correct-with-hint"] * .5;
    let denominator = this.scoreCts["correct"] + this.scoreCts["incorrect"] + this.scoreCts["correct-with-hint"];
    return String(numerator) + "/" + String(denominator);

  }

  nextBox() {
    //Comment this
    this.curLetterBox += 1
    if (this.curLetterBox == this.hint["index"]) {
      this.curLetterBox += 1
    }
    this.curLetterBox = this.curLetterBox % this.answerLength
    if (this.curLetterBox == this.hint["index"]) {
      this.curLetterBox += 1
    }
  }

  prevBox() {
    //Comment this
    if (this.curLetterBox != 0) {
      if (this.curLetterBox - 1 == this.hint["index"]) {
        if (this.curLetterBox - 2 >= 0) {
          this.curLetterBox -= 2
        }
      }
      else {
        this.curLetterBox -= 1
      }
    }


  }
  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    //TODO: Refactor this
    console.log(event.key);
    let keyPressed = event.key;
    if (keyPressed == "Enter") {
      this.handleSubmit()
    }

    else if (keyPressed == "Backspace") {
      this.answer[this.curLetterBox] = "";
      this.prevBox()
    }
    if (keyPressed == "Delete") {
      this.answer[this.curLetterBox] = "";
    }


    else if (keyPressed.length === 1 && keyPressed.match(/[a-z]|[A-Z]/i)) {
      //Key pressed is letter
      this.answer[this.curLetterBox] = keyPressed.toUpperCase();
      this.nextBox()


    }
    else if (keyPressed == "ArrowRight") {
      this.nextBox()
    }
    else if (keyPressed == "ArrowLeft") {
      this.prevBox()

    }


  }

  giveHint() {
    console.log(this.hint)
    if (Object.keys(this.hint).length === 0) {
      console.log("Giving Hint")
      for (let i = this.mostCommonLetters.length; i >= 0; i--) {
        let letter = this.mostCommonLetters[i]
        let idxOfChar = this.currentProblem["Word"].indexOf(letter)
        if (idxOfChar != -1) {
          console.log(this.hint)
          this.hint["letter"] = letter
          this.hint["index"] = idxOfChar
          break;
        }
      }
      if (!this.hint) {
        console.log('failed to find a hint');
        this.hint["letter"] = this.currentProblem["Word"][0]
        this.hint["index"] = 0
      }
      console.log(this.hint)
      this.answer[this.hint["index"]] = this.hint["letter"]
      if (this.curLetterBox == this.hint["index"]) {
        this.nextBox()
      }
    }

  }



  handleSubmit() {
    console.log("submitted")

    console.log(this.result)
    if (!this.problemFinished) {
      this.checkResponse();
    }
    else {
      setTimeout(() => {
        this.nextQuestion();
      }, 200);

    }

  }

  nextQuestion() {
    this.explanation = "";
    this.hint = {};
    this.result = "";
    this.problemIdx += 1;
    this.currentProblem = this.problemSet[this.problemIdx];
    this.curLetterBox = 0;
    this.setAnswerLength();
    this.problemFinished = false

  }
  checkResponse() {
    let answerStr = this.answer.join("").toUpperCase()
    console.log(answerStr)
    let actualAnswer = this.currentProblem["Word"]
    if (answerStr == actualAnswer) {
      this.result = "Correct!"
      if (Object.keys(this.hint).length != 0) {
        this.scoreCts["correct-with-hint"] += 1
      }
      else {
        this.scoreCts["correct"] += 1
      }
    }
    else {
      this.result = "Incorrect. The Answer is " + actualAnswer
      this.scoreCts["incorrect"] += 1
    }
    this.explanation = this.currentProblem["Explanation"];
    this.answer = actualAnswer.split("")
    this.problemFinished = true;


    this.problemsLeft -= 1;

  }


  selectBox(i) {
    if (i != this.hint["index"]) {
      this.curLetterBox = i
    }
  }
  findClass(i) {
    console.log(i);
    if (i == 0) {
      return "currentBox";
    }
    else {
      return "noClass"
    }
  }

  @HostListener('click') onClick() {
    setTimeout(() => {
      this.elRef.nativeElement.blur();
    }, 200);

  }
}

