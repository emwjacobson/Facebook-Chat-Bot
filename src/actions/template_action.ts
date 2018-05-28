import { ChatBot } from '../ChatBot';
import { Action } from './action';

export class TemplateAction extends Action {
    constructor() {
        super();
    }

    public call(context: ChatBot, message: any): void {
        
    }

    public getHelp(context: ChatBot): (string | void) {
        return;
    }
}