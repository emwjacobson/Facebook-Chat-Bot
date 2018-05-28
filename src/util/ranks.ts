import { ChatBot } from '../ChatBot';

let admins: string[] = ['100001404053579'];

export function isAdmin(user: string): boolean {
    if(admins.indexOf(user) >= 0){
        return true;
    }
    return false;
}