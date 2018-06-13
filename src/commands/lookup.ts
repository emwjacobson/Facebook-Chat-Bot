import { ChatBot } from '../ChatBot';
import { Command } from './command';
import * as util from '../util/ranks';
import * as moment from 'moment'

import * as messages from '../../messages/messages.json';

export class Lookup extends Command {
    constructor() {
        super("lookup");
    }

    public call(context: ChatBot, message: any): void {
        if(this.command_name == message.body.split(" ")[0]){
            const args: RegExpMatchArray | null = (<String>message.body).match(/\"(.*?)\" \"(.*?)\" (.*?)$/);

            console.log(args);
            if (!args || !(args[1] && args[2] && args[3])) {
                context.api.sendMessage("Usage: !lookup \"Person Name\" \"Message to lookup\" <limit #>" , message.threadID);
                return;
            }

            if (args[2].length < 3) {
                context.api.sendMessage("Search message needs to be 3 characters or more.", message.threadID);
                return;
            }

            if (parseInt(args[3]) > 50 && !util.isAdmin(message.senderID)) {
                context.api.sendMessage("Please limit yourself to 50 results.", message.threadID);
                return;
            }

            if ((<any>messages).participants.indexOf(args[1]) > -1) {
                let msgs_by_user: any[] = (<any>messages).messages.filter((message: any) => {
                    return message.sender_name === args[1] && message.content && message.content.toLowerCase().includes(args[2].toLowerCase());
                });

                if (msgs_by_user.length === 0) {
                    context.api.sendMessage("", message.threadID);
                }

                let final_message: string = "";
                for (let i = 0; i < msgs_by_user.length; i++) {
                    if (i >= parseInt(args[3])) {
                        break;
                    }
                    final_message += moment(msgs_by_user[i].timestamp * 1000).format('LLL') + "\n" + msgs_by_user[i].content + "\n\n";
                }
                context.api.sendMessage(final_message, message.threadID)
            }
        }
    }

    public getHelp(context: ChatBot): (string | void) {
        return context.command_indicator+this.command_name+":\n\tUsage: !lookup \"Person Name\" \"Message to lookup\" <limit #>"
    }
}