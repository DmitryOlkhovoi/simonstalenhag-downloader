import { URL } from 'url';
import HTMLParser from './HTMLParser';
import Downloader from './Downloader'

const GALLERY_URL = process.env.url ?
  new URL(process.env.url) : new URL('http://www.simonstalenhag.se/');

new HTMLParser().getItems(GALLERY_URL)
  .then((imageLinks) => {
    new Downloader(imageLinks).download();
  })