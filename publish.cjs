//nodejs脚本自动发布npm包
// const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;

//版本号自动更新
const versionUpdate = (version) => {
    const versionArr = version.split('.');
    versionArr[versionArr.length - 1] = parseInt(versionArr[versionArr.length - 1]) + 1;
    return versionArr.join('.');
}
// 获取当前目录
const currentPath = process.cwd();
// 获取package.json文件
const packageJson = require(path.join(currentPath, 'package.json'));
// 获取版本号
const version = versionUpdate(packageJson.version);
// 获取包名
// const name = packageJson.name;
// 获取npm包发布地址
//开始发布
console.log('开始发布');
//发布前先更新版本号
//更新package.json文件
exec(`npm version ${version}`, (error, stdout, stderr) => {
    if (error) {
        console.log(error);
        process.exit();
    }
    console.log(`更新版本号：${version}`);
    // 执行npm命令
    // exec(`npm publish`, (error, stdout, stderr) => {
    //     if (error) {
    //         console.log(error);
    //         process.exit();
    //     }
    //     console.log(`发布成功：${name}@${version}`);
    // });
});





