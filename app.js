const express = require('express')
const multer = require('multer')
const fs = require('fs')
const judge = require('./judge')
const shelljs = require('shelljs')
const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
});

const app = express()

app.use(express.urlencoded({extended:true}))
app.use(express.json())


app.post('/judge', upload.single('task') , async (req, res)=>{
    
    fs.closeSync(fs.openSync(`${__dirname}/output.txt`,"w"))
    fs.closeSync(fs.openSync(`${__dirname}/error.txt`,"w"))   

    

    fs.writeFileSync( `./solution.${req.body.lang}`, req.file.buffer )


    const {input, output, time, memory, lang} = req.body

    const inp = JSON.parse(input)
    const out = JSON.parse(output)
    await shelljs.exec(`sh judge.sh ${lang} error.txt`)
    const errorFile = fs.readFileSync(`${__dirname}/error.txt`, 'utf-8')
    const errors = errorFile.split('\n')
    if(errors.includes('COMPILATION ERROR')){
        const err = errors.map(i=>i.split(`solution.${lang}:`))
        let t1=[]
        for(let i=0;i<err.length;i++){
            if(err[i][0]==='COMPILATION ERROR') break;
            if( err[i].length===2 ) t1.push(err[i][1])
            else t1.push(err[i][0])
        } 
        return res.json({status: false, message: "COMPILATION ERROR", stdout: t1, })
    }
    for (let i = 0; i < inp.length; i++) {
        const el = inp[i];
        const str = el.map(i=>i).join(' ')
        fs.writeFileSync('./test.txt', str)
        const result = await judge(lang, time, memory, `solution.${lang}`)
        console.log(result)
        // console.log( res )
        if(result.status){
            let k = out[i]
            // if( typeof k === "number" ) k=k*1
            // console.log(k)
            // console.log(result.stdout === k)
        }
    }

    res.send({})
})

app.listen(3009, ()=>{
    console.log("Judge server listening 3009 port!")
})