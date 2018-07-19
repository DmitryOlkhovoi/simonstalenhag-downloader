import { URL } from 'url';
import { uniq } from 'underscore';
import request from 'request-promise';
import { load as cheerioLoad } from 'cheerio';

export default
class Parser {
  async getItems(url: URL): Promise<string[]> {
    try {
      const html = await request.get(url.href);
      const $ = cheerioLoad(html);
      const links = $('a')
        .toArray()
        .filter((elm: CheerioElement) => elm.attribs.href && elm.attribs.href.includes('big'))
        .map((elm: CheerioElement) => new URL(elm.attribs.href, url).toString());
        
      return uniq(links)
    } catch(error) {
      throw error;
    }
  }
}