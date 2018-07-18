import * as fs from 'fs';
import * as path from 'path';
import * as request from 'request-promise';
import uuid from 'uuid/v1';

export default
class Downloader {
  private links: string[];

  constructor(links: string[]) {
    this.links = links;
  }

  async download() {
    const dirname = path.resolve('./images/');

    try {
      !fs.existsSync(dirname) && await fs.mkdirSync(dirname);
    } catch(e) {
      console.error('Cannot create folder');
    }

    return Promise.all(this.links.map(async (link) => {
      try {
        const imageReq = await request.get(link, {resolveWithFullResponse: true, encoding: null});
        
        if(imageReq.statusCode === 200) {
          return fs.writeFileSync(
            path.resolve(dirname, `${uuid()} ${link.replace(/\//g, '.')}`
          ), Buffer.from(imageReq.body));
        }
      } catch(e) {
        console.error('Get error', e);
      }
    }))
  }
}