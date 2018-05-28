import { ChatBot } from '../ChatBot';
import { Action } from './action';

export class EightBall extends Action {
    constructor() {
        super();
    }

    public call(context: ChatBot, message: any): void {
        let msg = message.body;
        let responses = ["Yes", "No", "Maybe"];
        if(msg[0] == "🎱"){ // facebook-chat-api seems to not handle emojis correctly so this wont work.
            context.api.sendMessage(responses[Math.random()%responses.length], message.threadID);
        }
    }

    public getHelp(context: ChatBot): (string | void) {
        return "🎱 - Take your chances!";
    }
}