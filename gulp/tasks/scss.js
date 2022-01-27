import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import rename from 'gulp-rename';
import { app } from '../../gulpfile.js';

const sass = gulpSass(dartSass);

const scss = () => (app.gulp.src(app.path.src.scss, { sourcemaps: true })
  .pipe(sass())
  .pipe(app.gulp.dest(app.path.build.css))
  .pipe(app.plugins.browsersync.stream()));

export default scss;
