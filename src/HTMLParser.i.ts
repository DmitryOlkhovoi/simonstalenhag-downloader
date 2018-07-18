import { URL } from 'url';

export default
interface HTTParser {
  getItems(url: URL): Promise<String[]>;
}