import { Injectable } from '@nestjs/common';

interface IChat {
    from: string
    message: string
    sentAt: Date
}

@Injectable()
export class ChatService {

    public chats: IChat[];
    
    constructor() {
        this.chats = [];
    }


}
