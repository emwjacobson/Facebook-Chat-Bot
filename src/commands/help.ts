import { ChatBot } from '../ChatBot';
import { Command } from './command';

export class Help extends Command {
    constructor() {
        super("help");
    }

    public call(context: ChatBot, message: any): void {
        if(message.body == this.command_name){
            let help_msg: string = "";
            for(let cmd of context.commands){
                if(!cmd.hidden){
                    help_msg += cmd.getHelp(context) + "\n";
                }
            }
            for(let act of context.actions){
                if(!act.hidden){
                    help_msg += act.getHelp(context) + "\n";
                }
            }
            context.api.sendMessage(help_msg, message.threadID);
        }
    }

    public getHelp(context: ChatBot): (string | void) {
        return context.command_indicator+this.command_name+" - Displays this menu.";
    }
}