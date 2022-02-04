import replace from 'gulp-string-replace';
import { app } from '../../gulpfile.js';

const html = () => app.gulp.src(app.path.src.html)
  .pipe(replace('style.scss', 'style.css'))
  .pipe(app.gulp.dest(app.path.build.html))
  .pipe(app.plugins.browsersync.stream());

export default html;
