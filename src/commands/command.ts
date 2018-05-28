import { ChatBot } from '../ChatBot';

export class Command {
    public command_name: string;
    public hidden: boolean;

    constructor(command_name: string, hidden: boolean = false, ...args: string[]) {
        this.command_name = command_name;
        this.hidden = hidden;
    }

    public print(): void {
        console.log(this.command_name);
    }

    public call(context: ChatBot, message: any): void  {}

    public getHelp(context: ChatBot): (string | void) {
        if(this.hidden){
            return;
        }else{
            return context.command_indicator+this.command_name+" - no help set."
        }
    }
}