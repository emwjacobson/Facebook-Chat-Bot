import * as req from 'request';
import * as fs from 'fs';

let path: string = "./dist/img/";

if(!fs.existsSync(path)) {
    fs.mkdirSync(path);
}

export function downloadImage(url: string, filename: string): void {
    req.head(url, (err, res, body) => {
        req(url).pipe(fs.createWriteStream(path+filename));
    });
}