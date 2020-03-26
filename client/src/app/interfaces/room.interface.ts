import { IQuestion } from './question.interface';

export interface User {
    id: string;
    name: string;
    roomJoin?: string
}

export interface Room {
    id: string;
    name: string;
    joins: number;
    questions : IQuestion[]
    users: User[]
}

export interface CreateRoomMutation {
    createRoom : Room;
}

export interface GetRooms {
    getRooms: Room[];
}

export interface GetRoom {
    getRoom: Room
}

export interface JoinRoomMutation {
    joinRoom: Room;
}

export interface JoinRoomSubscription {
    joinRoom: User
}