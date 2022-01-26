import del from 'del';
import { app } from '../../gulpfile.js';

const reset = () => del(app.path.clean);

export default reset;
