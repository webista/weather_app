const gulp = require("gulp");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const browserSync = require("browser-sync");
const postcss = require("gulp-postcss");
const purgecss = require("gulp-purgecss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");
const del = require("del");
const concat = require("gulp-concat");
const header = require("gulp-header");

sass.compiler = require("node-sass");

// Text located in a header of minified files
const headerText = ["/**", " * Simple Weather app using ES6 features", " * @author Ondrej Kucera <ondrej@webista.cz>", " */\n"].join("\n");

// Paths
const paths = {
  html: {
    src: "src/*.html",
    dest: "dist/"
  },
  styles: {
    scss: "src/scss/**/*.scss",
    scssMain: "src/scss/main.scss",
    css: "src/css/",
    dest: "dist/css/"
  },
  scripts: {
    src: "src/js/**/*.js",
    dest: "dist/js/"
  },
  images: {
    src: "src/img/**/*",
    dest: "dist/img/"
  }
};

// Compile Sass into CSS
gulp.task("sass", () => {
  return gulp
    .src(paths.styles.scssMain)
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.css))
    .pipe(browserSync.reload({ stream: true }));
});

// Local server with Browser sync
gulp.task("serve", () => {
  browserSync.init({
    server: "./"
  });
});

// Watching .scss, .js, .html files
gulp.task("watch", () => {
  gulp.watch(paths.styles.scss, gulp.series("sass"));
  // gulp.watch(paths.scripts.src, gulp.series("js"));
  gulp.watch(paths.scripts.src).on("change", browserSync.reload);
  gulp.watch(paths.html.src).on("change", browserSync.reload);
});

// Just copying .html files from "src" to "dist" folder
gulp.task("html", () => {
  return gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest));
});

// Minify CSS
// TODO add Rev
gulp.task("min-css", () => {
  // let revName = "main.css?v=" + new Date().getTime().toString();
  return (
    gulp
      .src("src/css/main.css")
      .pipe(
        purgecss({
          content: [paths.html.src],
          whitelistPatterns: [/is-/, /c-/, /Loader/]
        })
      )
      .pipe(postcss([autoprefixer(), cssnano()]))
      // .pipe(
      //   rename({
      //     basename: "main",
      //     suffix: ".min",
      //     extname: ".css",
      //   })
      // )
      // .pipe(rename(revName))
      // .pipe(header("Hello ${name}\n", { name: "World" }))
      .pipe(header(headerText))
      .pipe(gulp.dest(paths.styles.dest))
  );
});

// Minify JS
// TODO add Rev
gulp.task("min-js", () => {
  return (
    gulp
      // .src(paths.scripts.src)
      .src(["src/js/lazyLoad.js", "src/js/tooltip.js", "src/js/main.js"])
      .pipe(sourcemaps.init())
      .pipe(
        babel({
          presets: ["@babel/env"]
        })
      )
      .pipe(concat("main.js"))
      .pipe(uglify())
      .pipe(sourcemaps.write())
      // .pipe(
      //   rename({
      //     basename: "main",
      //     suffix: ".min",
      //     extname: ".js",
      //   })
      // )
      // .pipe(header("Hello ${name}\n", { name: "World" }))
      .pipe(header(headerText))
      .pipe(gulp.dest(paths.scripts.dest))
  );
});

// Minify images
// gulp.task("images", ["clean"], function () {
//   return (
//     gulp
//       .src(paths.images.src)
//       // Pass in options to the task
//       .pipe(imagemin({ optimizationLevel: 5 }))
//       .pipe(gulp.dest(paths.images.dest))
//   );
// });

// Clean "dist" folder
gulp.task("clean", () => {
  return del(["dist/*.html", "dist/css", "dist/js"]);
});

gulp.task("default", gulp.parallel("serve", "watch"));
gulp.task("build", gulp.series("clean", "html", "min-css", "min-js"));
