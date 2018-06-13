import { ChatBot } from '../ChatBot';
import { Command } from './command';

export class TemplateCommand extends Command {
    constructor() {
        super("command_name");
    }

    public call(context: ChatBot, message: any): void {
        if(message.body == this.command_name){
            context.api.sendMessage("hello world!", message.threadID);
        }
    }

    public getHelp(context: ChatBot): (string | void) {
        return context.command_indicator+this.command_name+":\n\t no help set."
    }
}