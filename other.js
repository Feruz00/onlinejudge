const shelljs = require('shelljs')
const path = require('path')
const fs = require('fs')

const start = async ()=>{

    await shelljs.exec( `docker run -p 3009:3009 -v ${path.join(__dirname,'judge.sh')}:/app/judge.sh  -v ${path.join(__dirname,'judge.js')}:/app/judge.js -v ${path.join(__dirname,'output.txt')}:/app/output.txt -v ${path.join(__dirname,'error.txt')}:/app/error.txt -v ${path.join(__dirname,'test.txt')}:/app/test.txt -v ${path.join(__dirname,'app.js')}:/app/app.js   judge-test:0.0.3` )
}

start()