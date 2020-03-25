import { Component, OnInit } from '@angular/core';
import { IQuestionForm } from 'src/app/interfaces/question.interface';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  public questions: IQuestionForm[] = [];

  public selectedFormIndex: number;

  constructor() {
    this.questions.push({
      title : '',
      answer_1 : '',
      answer_2 : '',
      answer_3 : '',
      answer_4 : ''
    });

    this.selectedFormIndex = 0;
  }

  ngOnInit() {
  }

  addQuestion() {
    this.questions.push({
      title : '',
      answer_1 : '',
      answer_2 : '',
      answer_3 : '',
      answer_4 : ''
    });
  };

  selectQuestion(index) {
    console.log(index)
    this.selectedFormIndex = index;
  }

  printForm() {
    console.log(this.questions[this.selectedFormIndex]);
  }

}
