/**
 * Created by mark1 on 2016/8/22.
 */
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const uglify = require('gulp-uglify');

const rimraf = require('gulp-rimraf');
// const less = require('gulp-less');
// const coffee = require('gulp-coffee');
const gulpSequence = require('gulp-sequence');

//css
const cleanCss = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');

const gulpif = require('gulp-if');
const watch = require('gulp-watch');

const htmlMinOptions = {
    caseSensitive: true,  //大小写敏感
    ignoreCustomFragments:[/{{[\s\S]*?}}/,/{{{[\s\S]*?}}}/],
    trimCustomFragments: false,
    removeComments: true,  //清除HTML注释
    collapseWhitespace: true,  //压缩HTML
    //collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
    //removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
    minifyJS: true,  //压缩页面JS
    // minifyCSS: true  //压缩页面CSS
};

gulp.task('clean-dist', function () {
    return gulp.src(['dist/'], {read: false})
        .pipe(rimraf({force: true}));
});

gulp.task('clean-tmp', function () {
    return gulp.src(['dist/'], {read: false})
        .pipe(rimraf({force: true}));
});

gulp.task('clean', ['clean-tmp', 'clean-dist']);


gulp.task('ico', function () {
    return gulp.src(['**/*/favicon.ico'])
        .pipe(gulp.dest('dist/'));
});

gulp.task('tmp', function () {
    return gulp.src(['**/*/*.html','**/*/*.png','**/*.json','**/*/*.jpg','**/*/*.css','**/*/*.js','!node_modules/**','app.js','!gulpfile.js','index.html', '**/font/*.{TTF,eot,ttf}'])
        .pipe(gulp.dest('dist/'));
});

//压缩css

gulp.task('minifycss', function() {
    return gulp.src('dist/**/*.css')      //压缩的文件
        .pipe(autoprefixer())
        .pipe(cleanCss({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist/'));   //输出文件夹
});

//压缩js

gulp.task('uglifyjs', function() {
    return gulp.src(['dist/**/js/*.js','!dist/**/js/jquery.min.js'])      //压缩的文件
        .pipe(uglify())
        .pipe(gulp.dest('dist/'));   //输出文件夹
});

//压缩html

gulp.task('htmlminify', function() {
    return gulp.src('dist/**/*.html')      //压缩的文件
               .pipe(htmlmin(htmlMinOptions))
               .pipe(gulp.dest('dist/'));   //输出文件夹
});

gulp.task('replace', gulpSequence('htmlreplace'));

gulp.task('copy', gulpSequence(['ico', 'tmp']));


gulp.task('build-with-tmp', gulpSequence('clean', 'copy', ['minifycss', 'uglifyjs','htmlminify']));

gulp.task('build', gulpSequence('build-with-tmp'));
