import gulp from 'gulp'
import { path } from './gulp/path.js'
import { plugins } from './gulp/plugins.js'

export const app = {
    path: path,
    gulp: gulp,
    plugins: plugins
}

import { copy } from './gulp/tasks/copy.js'
import { reset } from './gulp/tasks/reset.js'
import { html } from './gulp/tasks/html.js'
import { server } from './gulp/tasks/server.js'
import { scss } from './gulp/tasks/scss.js'
import { script } from './gulp/tasks/script.js'

function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, script)
}

const mainTask = gulp.parallel(copy, html, scss, script)

const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server))

gulp.task('default', dev)