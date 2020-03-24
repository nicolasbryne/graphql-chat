export interface User {
    id: string;
    name: string;
    roomJoin?: string
}

export interface Room {
    id: string;
    name: string;
    joins: number;
    users: User[]
}

export interface CreateRoomMutation {
    createRoom : Room;
}

export interface GetRooms {
    getRooms: Room[];
}

export interface JoinRoomMutation {
    joinRoom: Room;
}

export interface JoinRoomSubscription {
    joinRoom: User
}