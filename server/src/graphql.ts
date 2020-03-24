
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
}

export interface IQuery {
    getAllChats(): Message[] | Promise<Message[]>;
}

export interface ISubscription {
    newMessage(): Message | Promise<Message>;
}
