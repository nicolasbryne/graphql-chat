import { Component, OnInit } from '@angular/core';
import { IQuestionForm, QuestionsInput } from 'src/app/interfaces/question.interface';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute } from '@angular/router';
import { GetRoom } from 'src/app/interfaces/room.interface';


@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  public questions: IQuestionForm[] = [];

  public selectedFormIndex: number = 0;

  public roomId: string;

  constructor(private apollo: Apollo, private route: ActivatedRoute) {
    

    
  }

  ngOnInit() {
    this.roomId = this.route.snapshot.paramMap.get('id');

    this.questions.push({
      title : '',
      answer_1 : '',
      answer_2 : '',
      answer_3 : '',
      answer_4 : ''
    });
    
    this.getQuestions();

    
  }

  getQuestions() {
    this.apollo.query<GetRoom>({
      query: gql`
        query getRoom($id: String!) {
          getRoom(id: $id) {
            questions {
              title
              answers {
                answer
                correct
              }
            }
          }
        }
      `,
      variables : { id : this.roomId }
    }).subscribe( results => {
      
      if(!results.data.getRoom.questions || results.data.getRoom.questions.length === 0) {
        return
      }
      this.questions = results.data.getRoom.questions.map( question => {
        return { 
            title : question.title,
            answer_1 : question.answers[0].answer,
            answer_2 : question.answers[1].answer,
            answer_3 : question.answers[2].answer,
            answer_4 : question.answers[3].answer
          }
      })
    })
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
    this.selectedFormIndex = index;
  }

  printForm() {
    console.log(this.questions[this.selectedFormIndex]);
  }

  submitQuestions() {
    const questionInput: QuestionsInput = {
      roomId : this.roomId,
      questions : this.questions.map( (question, index) => {
        return {
          id : index+'',
          title: question.title,
          answers: [
            {
              id : 'answer',
              answer : question.answer_1,
              correct : true
            },
            {
              id : 'answer',
              answer : question.answer_2,
              correct : false
            },
            {
              id : 'answer',
              answer : question.answer_3,
              correct : false
            },
            {
              id : 'answer',
              answer : question.answer_4,
              correct : false
            },
          ]
        }
      })
    }
    
    this.apollo.mutate({
      mutation : gql`
          mutation createQuestions($input: QuestionsInput) {
            createQuestion(input: $input)
          }
      `,
      variables : { input : questionInput }
    }).subscribe(console.log);
    
  }


}
