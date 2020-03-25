export interface IQuestion {
    title : string;
    answers : IAnswer[]
}

export interface IAnswer {
    id: number
    answer : string
}

export interface IQuestionForm {
    title : string;
    answer_1 : string;
    answer_2: string;
    answer_3?: string;
    answer_4? : string;
}