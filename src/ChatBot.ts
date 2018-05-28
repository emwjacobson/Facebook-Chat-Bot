import * as fb from 'facebook-chat-api';
import { Command, HelloWorld, Help } from './commands';
import { Action, Reactions, EightBall, FileSaver } from './actions';

export class ChatBot {
    public isLoggedIn: boolean = false;
    public api: any;
    public command_indicator: string = '!';

    public commands: Command[] = [];
    public actions: Action[] = [];

    constructor() {}

    public login(user: (string | undefined), pass: (string | undefined)): void {
        if (!user || !pass) {
            console.error("Username or Password are not set as env variables.");
            return;
        }
        fb({ email: user, password: pass }, (err: any, api: any) => {
            if (err) {
                console.error(err);
                this.isLoggedIn = false;
            }
            this.isLoggedIn = true;
            this.api = api;
            this.api.setOptions({ listenEvents: true, selfListen: true });
            this.api.listen(this.message(this));
            this.register();
        });
    }

    private register_commands(): void {
        // ADD COMMANDS HERE
        // DONT FORGET TO IMPORT AND ADD COMMAND TO ./commands/index.ts
        let help = new Help();
        let hello_world = new HelloWorld();

        this.commands.push(help, hello_world);
    }

    private register_actions(): void {
        // ADD ACTIONS HERE
        // DONT FORGET TO IMPORT AND ADD ACTIONS TO ./actions/index.ts
        let reactions = new Reactions();
        let eightball = new EightBall();
        let filesaver = new FileSaver();

        this.actions.push(reactions, eightball, filesaver);
    }

    private register(): void {
        this.register_commands();
        this.register_actions();
    }

    private message(context: ChatBot): any {
        return function (error: any, message: any) {
            // console.log(message);
            if (message && message.type === 'message') {
                // For commands
                if (message.body[0] == context.command_indicator) {
                    message.body = message.body.substr(1);
                    for (let cmd of context.commands) {
                        cmd.call(context, message);
                    }
                }

                // For normal messages
                else {
                    for (let action of context.actions) {
                        action.call(context, message);
                    }
                }

            }
        }
    }
}