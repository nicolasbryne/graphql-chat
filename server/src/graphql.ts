
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface AnswerInput {
    id: string;
    answer: string;
    correct: boolean;
}

export interface QuestionInput {
    id: string;
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

export interface Message {
    from: string;
    message: string;
    sentAt: number;
}

export interface IMutation {
    createMessage(from: string, message: string): Message | Promise<Message>;
    createRoom(name: string): Room | Promise<Room>;
    joinRoom(id: string, userId: string, name: string): Room | Promise<Room>;
    createQuestion(input?: QuestionsInput): boolean | Promise<boolean>;
}

export interface IQuery {
    getAllChats(): Message[] | Promise<Message[]>;
    getRooms(): Room[] | Promise<Room[]>;
    getRoom(id: string): Room | Promise<Room>;
}

export interface Question {
    id: string;
    answers?: Answer[];
}

export interface Room {
    id: string;
    name: string;
    questions?: Question[];
    joins: number;
    users: User[];
}

export interface ISubscription {
    newMessage(): Message | Promise<Message>;
    joinRoom(): User | Promise<User>;
}

export interface User {
    id: string;
    name: string;
    roomJoin?: string;
}
