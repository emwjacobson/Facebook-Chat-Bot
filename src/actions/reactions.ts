import { ChatBot } from '../ChatBot';
import { Action } from './action';

export class Reactions extends Action {
    constructor() {
        super(true)
    }

    public call(context: ChatBot, message: any): void {
        let msg = message.body.toLowerCase();
        if(msg.includes('reddit') || msg.includes('manga')){
            context.api.setMessageReaction(":dislike:", message.messageID);
        }

        if(msg.includes('mapo') || msg.includes('hentai') || msg.includes('anime')){
            context.api.setMessageReaction(":like:", message.messageID);
        }
    }

}
