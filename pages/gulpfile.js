const gulp = require('gulp');
const webpack = require('webpack');
const SFTP = require('ssh2-sftp-client');
const webpackConfig = require('./webpack.config.js');
const webpackTestConfig = require('./webpack.config.dev.js');
const fs = require('fs');

gulp.task('config',()=>{
  console.log(JSON.stringify(webpackTestConfig))
})

gulp.task('default', () => {
  webpack(webpackConfig, (err, stats) => {
    if (err)
      throw err;
    process.stdout.write(stats.toString({colors: true, modules: false, children: false, chunkModules: false}) + '\n\n');

    if (stats.hasErrors()) {
      console.log('Build failed with errors.\n');
      process.exit(1);
    }

    console.log('  Build complete.\n');
    console.log('  Tip: built files are meant to be served over an HTTP server.\n' + '  Opening index.html over file:// won\'t work.\n');
  });
});

gulp.task('dev', () => {
  console.log('开发配置开始打包');
  webpack(webpackTestConfig, (err, stats) => {
    if (err)
      throw err;
    process.stdout.write(stats.toString({colors: true, modules: false, children: false, chunkModules: false}) + '\n\n');

    if (stats.hasErrors()) {
      console.log('Build failed with errors.\n');
      process.exit(1);
    }

    console.log('  Build complete.\n');
    console.log('  Tip: built files are meant to be served over an HTTP server.\n' + '  Opening index.html over file:// won\'t work.\n');
  });
  console.log('结束打包');
});


