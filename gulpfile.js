/* eslint-env node */
const clean = require('gulp-clean'),
  editor = require('mem-fs-editor'),
  gulp = require('gulp'),
  memFs = require('mem-fs'),
  path = require('path');

gulp.task('build', ['clean'], done => {
  const settings = require('./src/settings'),
    store = memFs.create(),
    fs = editor.create(store),
    source = path.join(__dirname, 'src/theme.json'),
    context = {
      attributes: settings.COLORS.ATTRIBUTES,
      background: settings.COLORS.BACKGROUND,
      comment: settings.COLORS.COMMENT,
      constants: settings.COLORS.CONSTANTS,
      cssClass: settings.COLORS.CSS_CLASS,
      functionDeclarations: settings.COLORS.FUNCTION_DECLARATIONS,
      invalidBackground: settings.COLORS.INVALID_BACKGROUND,
      invalidBorder: settings.COLORS.INVALID_BORDER,
      invisibles: settings.COLORS.INVISIBLES,
      keyword: settings.COLORS.KEYWORD,
      name: settings.NAME,
      punctuation: settings.COLORS.PUNCTUATION,
      storage: settings.COLORS.STORAGE,
      strings: settings.COLORS.STRINGS,
      tagsAndArguments: settings.COLORS.TAGS_ARGUMENTS,
      themeType: settings.THEME_TYPE,
      types: settings.COLORS.TYPES
    };
  try {
    fs.copyTpl(source, 'themes/theme.json', context);
    fs.commit(() => {
      done();
    });
  } catch (error) {
    console.log(error); // eslint-disable-line
  }
});

gulp.task('clean', () => gulp.src('themes', { read: false }).pipe(clean()));
