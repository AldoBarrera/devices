const gulp = require('gulp');
const ts = require('gulp-typescript');
const JSON_FILES = ['src/*.json', 'src/**/*.json'];

const tsProject = ts.createProject('tsconfig.json');

gulp.task('assets', function() {
  return gulp.src(JSON_FILES)
  .pipe(gulp.dest('dist'));
});
gulp.task('scripts', () => {
  return tsProject.src()
  .pipe(tsProject())
  .js
  .pipe(gulp.dest('dist'));
});

gulp.task('watch', gulp.parallel('scripts'), () => {
  gulp.watch('src/**/*.ts', ['scripts']);
});

gulp.task('default',
  gulp.series('scripts', 'assets'));
