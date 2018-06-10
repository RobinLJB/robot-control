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

gulp.task('sftp', () => {
  console.log("开始部署文件到服务器");

  let sftp = new SFTP();

  const readDir = function(dir, remotePath) {
    fs.readdir(dir, function(error, files) {
      console.log(files)
      files.map(function(file) {
        if (!(fs.statSync(dir + '/' + file).isDirectory())) {
          console.log(dir + '/' + file + "该文件需要上传");
          sftp.put(dir + '/' + file, remotePath + '/' + file).catch((err) => {
            console.log(err, 'catch error');
          }).then(()=>{
            console.log(dir + '/' + file + "上传完成");
          });;
        } else {
          sftp.mkdir(remotePath + '/' + file, true).catch((err) => {
            console.log(err, 'catch error');
          }).then(() => {
            console.log("创建文件夹成功");
            readDir(dir + '/' + file, remotePath + '/' + file);
          });

        }
      });
    })
  }

  sftp.connect({host: 'robinluo.top', port: '22', username: 'root', password: 'RobinLuo123'}).then(() => {
    setTimeout(() => {
      //设定为20秒内上传完成 并退出程序
      process.exit(1);
    }, 1000 * 40);
    //先归档
    sftp.mkdir('/root/backup/', true).then(() => {
      return sftp.rename('/root/webapps/xdy-background', '/root/backup/xdy-background ' + new Date());
    }).catch((err) => {
      console.log(err, 'catch error');
    }).then(() => {
      return sftp.mkdir('/root/webapps/xdy-background', true);
    }).then(() => {
      readDir(__dirname + '/build', '/root/webapps/xdy-background');
    });

  });




})
