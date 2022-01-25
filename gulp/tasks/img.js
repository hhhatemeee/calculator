import { app } from "../../gulpfile.js"

const img = () => {
    return app.gulp.src(app.path.src.img)
        .pipe(app.gulp.dest(app.path.build.img))
        .pipe(app.plugins.browsersync.stream());
}

export default img;
