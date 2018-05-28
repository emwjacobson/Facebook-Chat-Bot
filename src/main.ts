import { ChatBot } from './ChatBot';
import * as minimist from 'minimist';

function main() {
    let argv = minimist(process.argv.slice(2));

    if (!argv.u) {
        console.error("Username not supplied.\n");
        displayHelp();
        return;
    }
    if (!argv.p) {
        console.error("Password not supplied.\n");
        displayHelp();
        return;
    }

    let bot = new ChatBot();
    bot.login(argv.u, argv.p);
}

function displayHelp(): void {
    console.log("-u \"USERNAME\" -p \"PASSWORD\"");
}

main();