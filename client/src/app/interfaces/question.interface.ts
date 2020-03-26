export interface IQuestion {
    title : string;
    answers : IAnswer[]
}

export interface IAnswer {
    id: string
    answer : string
}

export interface IQuestionForm {
    title : string;
    answer_1 : string;
    answer_2: string;
    answer_3?: string;
    answer_4? : string;
}

export interface AnswerInput {
    id: string;
    answer: string;
    correct: boolean;
}

export interface QuestionInput {
    id: string;
    title: string;
    answers?: AnswerInput[];
}

export interface QuestionsInput {
    roomId: string;
    questions?: QuestionInput[];
}

export interface Answer {
    id: string;
    answer: string;
    correct: boolean;
}