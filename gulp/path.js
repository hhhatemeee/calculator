import * as nodePath from 'path';


const rootFolder = nodePath.basename(nodePath.resolve())
const buildFolder = './dist'
const srcFolder = './src'

export const path = {
    build: {
        img: `${buildFolder}/img/`,
        fonts: `${buildFolder}/fonts/`,
        js: `${buildFolder}/js/`,
        html: `${buildFolder}/`,
        css: `${buildFolder}/css`,
        files: `${buildFolder}/files/`,
    },
    src: {
        img: `${srcFolder}/img/**/*.*`,
        fonts: `${srcFolder}/fonts/**/*.*`,
        js: `${srcFolder}/js/script.js`,
        scss: `${srcFolder}/scss/style.scss`,
        html: `${srcFolder}/*.html`,
        files: `${srcFolder}/files/**/*.*`,
    },
    watch: {
        img: `${srcFolder}/img/**/*.*`,
        fonts: `${srcFolder}/fonts/**/*.*`,
        js: `${srcFolder}/js/**/*.js`,
        html: `${srcFolder}/**/*.html`,
        files: `${srcFolder}/files/**/*.*`,
        scss: `${srcFolder}/scss/**/*.scss`
    },
    clean: buildFolder,
    buildFolder: buildFolder,
    srcFolder: srcFolder,
    rootFolder: rootFolder,

}