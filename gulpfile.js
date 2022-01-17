import gulp from 'gulp'
import { path } from './gulp/path.js'
import { plugins } from './gulp/plugins.js'

import copy from './gulp/tasks/copy.js'
import reset from './gulp/tasks/reset.js'
import html from './gulp/tasks/html.js'
import server from './gulp/tasks/server.js'
import scss from './gulp/tasks/scss.js'
import script from './gulp/tasks/script.js'
import fonts from './gulp/tasks/fonts.js'

function watcher() {
    gulp.watch(path.watch.files, copy)
    gulp.watch(path.watch.html, html)
    gulp.watch(path.watch.scss, scss)
    gulp.watch(path.watch.js, script)
    gulp.watch(path.watch.fonts, fonts)
}

const mainTask = gulp.parallel(copy, html, scss, script, fonts)

const dev = gulp.series(reset, mainTask, gulp.parallel(watcher, server))

gulp.task('default', dev)

export const app = {
    path, gulp, plugins
}
