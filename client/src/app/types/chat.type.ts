export type Chat = {
    from : string,
    message: string,
    sentAt: number
}

export type AllChatsQuery = {
    getAllChats: Chat[]
}