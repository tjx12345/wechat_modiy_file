'use strict';
const fs = require('fs');
const fsExtra = require('fs-extra');
const path = require('path');
console.log('请输入目录路径:');
process.stdin.on('data',(data)=>{
    let mypath = data.toString().trim();
    if( mypath === ''){
        console.log('输入有误');
        process.exit();
    }
    fs.stat(mypath,(err,stats)=>{
        if(!stats.isDirectory()){
             console.log('不是一个文件夹。退出');
             process.exit();
        }
        fs.readdir(mypath,(err,files)=>{
            let tempDir ='./tjx_backup'+Date.now()+'/';
            for (var i = 0; i < files.length; i++) {
                console.log(tempDir+files[i])
                if(path.extname(files[i]) === '.pic'){
                    fsExtra.move(path.join(mypath,files[i]),tempDir+files[i].replace('.pic','.jpg'),(err)=>{
                        if(err) throw err;
                        
                    });
                }
                if(path.extname(files[i]) === '.mp4'||path.extname(files[i]) === '.aud'){
                    fsExtra.move(path.join(mypath,files[i]),tempDir+files[i],(err)=>{
                        if(err) throw err;
                        
                    });
                }
            }
        });
    });
})
