import { app } from "../../gulpfile.js"

const fonts = () => {
    return app.gulp.src(app.path.src.fonts)
        .pipe(app.gulp.dest(app.path.build.fonts))
        .pipe(app.plugins.browsersync.stream())
}

export default fonts;
