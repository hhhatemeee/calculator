import del from 'del'
import { app } from '../../gulpfile.js'

const reset = () => {
    return del(app.path.clean);
}

export default reset