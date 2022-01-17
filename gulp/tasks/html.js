import { app } from "../../gulpfile.js"

const html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream());
}

export default html;
