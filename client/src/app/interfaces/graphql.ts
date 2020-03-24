
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface Message {
    from: string;
    message: string;
    sentAt: number;
}

export interface IMutation {
    createMessage(from: string, message: string): Message | Promise<Message>;
    createRoom(name: string): Room | Promise<Room>;
    joinRoom(id: string): Room | Promise<Room>;
}

export interface IQuery {
    getAllChats(): Message[] | Promise<Message[]>;
    getRooms(): Room[] | Promise<Room[]>;
    getRoom(id: string): Room | Promise<Room>;
}

export interface Room {
    id: string;
    name: string;
    users: number;
}

export interface ISubscription {
    newMessage(): Message | Promise<Message>;
    joinRoom(): User | Promise<User>;
}

export interface User {
    id: string;
    name: string;
    roomJoin?: string
}
