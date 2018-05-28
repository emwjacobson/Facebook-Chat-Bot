import { ChatBot } from '../ChatBot';
import { Command } from './command';
import * as util from '../util/ranks';

export class HelloWorld extends Command {
    constructor() {
        super("helloworld", true);
    }

    public call(context: ChatBot, message: any): void {
        if(message.body == this.command_name){
            if(!util.isAdmin(message.senderID)){
                context.api.sendMessage("Ur not an admin!", message.threadID);
                return;
            }
            context.api.sendMessage("hello world!", message.threadID);
        }
    }

    public getHelp(context: ChatBot): (string | void) {
        return context.command_indicator+this.command_name+" - Hello World!";
    } 
}