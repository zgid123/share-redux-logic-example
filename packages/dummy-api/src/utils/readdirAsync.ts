import { readdir } from 'fs';
import { promisify } from 'util';

export default promisify(readdir);
