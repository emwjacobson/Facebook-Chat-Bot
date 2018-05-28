import { ChatBot } from '../ChatBot';
import { Action } from './action';
import * as image from '../util/image';

export class FileSaver extends Action {
    constructor() {
        super(true);
    }

    public call(context: ChatBot, message: any): void {
        for(let photo of message.attachments){
            let filename = (new Date).getTime() + "_" + message.senderID + ".png";
            image.downloadImage(photo.url, filename);
        }
    }
}