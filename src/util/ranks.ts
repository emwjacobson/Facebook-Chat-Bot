import { ChatBot } from '../ChatBot';

let admins: string[] = [
    // Insert FB ids of admins here.
    '100001404053579'
];

export function isAdmin(user: string): boolean {
    return admins.indexOf(user) >= 0;
}