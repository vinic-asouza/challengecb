var { watch, src, dest, parallel, series } = require("gulp"),
    stylus = require("gulp-stylus"),
    autoprefixer = require("autoprefixer-stylus"),
    jsImport = require("gulp-js-import"),
    minify = require("gulp-minify"),
    rename = require("gulp-rename"),
    concat = require("gulp-concat"),
    cleanCSS = require("gulp-clean-css")

function css() {
    return src("src/**/*.styl")
        .pipe(
            stylus({
                "include css": true,
                use: [autoprefixer("iOS >= 7", "last 1 Chrome version")],
                compress: true,
                linenos: false,
                // import: __dirname + "/src/configs/settings.styl"
            })
        )
        .pipe(rename("styles.css"))
        .pipe(concat("styles.css"))
        .pipe(dest("public/assets/css/"))
}

// function js() {
//     return src("src/**/*.js", { sourcemaps: false })
//         .pipe(jsImport({ hideConsole: true }))
//         .pipe(concat("app.js"))
//         .pipe(
//             minify({
//                 ext: {
//                     src: ".js",
//                     min: ".min.js"
//                 },
//                 exclude: ["tasks"],
//                 ignoreFiles: [".combo.js", "-min.js"]
//             })
//         )
//         .pipe(dest("opencode/js", { sourcemaps: false }))
// }

// exports.js = js
exports.css = css

exports.init = series(css)
exports.default = function () {
    watch("src/**/*.styl", series(css))
    // watch("src/**/*.js", series(js))
}
