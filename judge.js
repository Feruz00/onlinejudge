const path = require('path');
const fs = require('fs')
const shelljs = require('shelljs');


const second = 'error.txt'
const third = 'output.txt'

const judge = async (first, four, mem, filename)=>{
    fs.closeSync(fs.openSync(`${__dirname}/output.txt`,"w"))
    fs.closeSync(fs.openSync(`${__dirname}/error.txt`,"w"))
    // version 1
    // await shelljs.exec( `docker run --rm -v ${path.join(__dirname,filename)}:/app/${filename}  -v ${path.join(__dirname,'judge.sh')}:/app/judge.sh -v ${path.join(__dirname,'output.txt')}:/app/output.txt -v ${path.join(__dirname,'error.txt')}:/app/error.txt -v ${path.join(__dirname,'test.txt')}:/app/test.txt feruz/judge:0.0.1 ${first} ${second} ${third} ${four} ` )
    // version 2
    // await shelljs.exec("sh compiler.sh")
    // await shelljs.exec('ls')
    await shelljs.exec(`sh judge.sh ${first} ${second} ${third} ${four} `)
    // await shelljs.exec( `${path.join(__dirname,filename)}:/app/${filename}  -v ${path.join(__dirname,'judge.sh')}:/app/judge.sh -v ${path.join(__dirname,'output.txt')}:/app/output.txt -v ${path.join(__dirname,'error.txt')}:/app/error.txt -v ${path.join(__dirname,'test.txt')}:/app/test.txt feruz/judge:0.0.1 ${first} ${second} ${third} ${four} ` )
    
    const errorFile = fs.readFileSync(`${__dirname}/error.txt`, 'utf-8')
    const outputFile = fs.readFileSync(`${__dirname}/output.txt`, 'utf-8')
    
    if(!outputFile.length){

        const errors = errorFile.split('\n')
        
        if(errors.includes('RUNTIME ERROR')){
            const [time, memory] = errors[1].split(' ').map(i=>i*1.00001)
            // const diffM = memory - initMemory[getItem(first)-1]
            if(time-four>=0) return { status: false, message:"TIME LIMIT" }
            // console.log("TIME LIMIT")
            else  if( memory - mem*1024 >=0 ) return { status: false, message:"MEMORY LIMIT" }
            else return { status: false, message:"RUNTIME ERROR" }
        }
        else{
            const err = errors.map(i=>i.split(`${filename}:`))
            // console.log(err)
            let t1=[]
            for(let i=0;i<err.length;i++){
                if(err[i][0]==='COMPILATION ERROR') break;
                if( err[i].length===2 ) t1.push(err[i][1])
                else t1.push(err[i][0])
            } 
            // console.log("COMPILATION ERROR");
            return {status: false, message: "COMPILATION ERROR", stdout: t1, }

        }
    }
    const errs = errorFile.split('\n')[0].split(' ')
    // console.log(errs)
    const time = errs[0] * 1.00001;
    const memory = errs[1]*1

    if(time-four>=0) return { status: false, message:"TIME LIMIT" }
    else  if( memory - mem*1024 >=0 ) return { status: false, message:"MEMORY LIMIT" }

    // console.log(time, memory)
    return {status: true, stdout: outputFile, time, memory}
}

// judge('cpp', 1, 16, 'solution.cpp')

module.exports = judge