import { ChatBot } from '../ChatBot';

export class Action {
    hidden: boolean;
    constructor(hidden: boolean = false) {
        this.hidden = hidden;
    }

    public call(context: ChatBot, message: any): void {}

    public getHelp(context: ChatBot): (string | void) {
        return;
    }
}