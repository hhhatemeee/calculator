import { app } from '../../gulpfile.js'
import babel from 'gulp-babel'
import webpack from 'webpack-stream';


const script = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: true })
        .pipe(babel({ presets: ["@babel/preset-env"] }))
        .pipe(webpack({
            mode: 'development'
        }))
        .pipe(app.gulp.dest(app.path.build.js))
        .pipe(app.plugins.browsersync.stream());
}

export default script;