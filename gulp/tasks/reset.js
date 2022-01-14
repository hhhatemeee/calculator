import del from 'del'
import { app } from '../../gulpfile.js'

export const reset = () => {
    return del(app.path.clean)
}