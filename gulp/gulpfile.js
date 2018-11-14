var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');

gulp.task('htmlmin', function () {
  var options = {
    removeComments: true,  //清除HTML注释
    collapseWhitespace: true,  //压缩HTML
    collapseBooleanAttributes: true,  //省略布尔属性的值 <input checked="true"/> ==> <input checked />
    removeEmptyAttributes: true,  //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true,  //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true,  //删除<style>和<link>的type="text/css"
    minifyJS: true,  //压缩页面JS
    minifyCSS: true  //压缩页面CSS
  };
  gulp.src('zht-en-ww/*.html')
    .pipe(htmlmin(options))
    .pipe(gulp.dest('dist/zht-en-ww'));
});

gulp.task('minifycss', function () {
  return gulp.src('zht-en-ww/css/*.css')    //需要操作的文件
    .pipe(minifycss())   //执行压缩
    .pipe(gulp.dest('dist/zht-en-ww/css'));   //输出文件夹
});

gulp.task('minifyjs', function () {
  return gulp.src('zht-en-ww/js/*.js')      //需要操作的文件
    .pipe(uglify())    //压缩
    .pipe(gulp.dest('dist/zht-en-ww/js'));  //输出
});

gulp.task('copyimages',  function() {
  return gulp.src('zht-en-ww/images/*')
    .pipe(gulp.dest('dist/zht-en-ww/images'))
});
gulp.task('copyfonts',  function() {
  return gulp.src('zht-en-ww/fonts/*')
    .pipe(gulp.dest('dist/zht-en-ww/fonts'))
});

gulp.task('copyextrafile1',  function() {
  return gulp.src('zht-en-ww/js/need/*')
    .pipe(gulp.dest('dist/zht-en-ww/js/need'))
});
gulp.task('copyextrafile2',  function() {
  return gulp.src('zht-en-ww/js/vendor/*')
    .pipe(gulp.dest('dist/zht-en-ww/js/vendor'))
});
// gulp htmlmin minifycss minifyjs copyimages copyfonts copyextrafile1 copyextrafile2