const {exec}=require("child_process")
const path = require('path');
const fs =require('fs');
const {S3Client,PutObjectCommand} =require('@aws-sdk/client-s3')
const mime =require('mime-types')
const Redis = require('ioredis')
const {} =reqiure('socket.io')






const publisher = new Redis('') 



const S3Client = new S3Client({
    region : 'ap-south-1',
    Credentials:{
        accessKeyId: env.idkey,
        secretAccessKey: env.skey
    }
})

const PROJECT_ID= process.env.PROJECT_ID

function publishLog(log){
    publisher.publish(`logs:${PROJECT_ID}`, JSON.stringify({log}))
}

async function init(){
    console.log("executing");
    publishLog('Build Started...')
    const outDirPath = path.join(__dirname, 'output');
    const p=exec(`cd ${outDirPath} && npm install && npm run build`)  
    p.stdout.on('data', function(data){
        console.log(data.toString())
        publishLog(data.toString())
    } )
    
    p.stdout.on('error',function(data){
        console.log('Eroor',data.toString())
        publishLog(`error: ${data.toString()}`)
    })

    p.on('close',async function(){
        console.log('Build')
        publishLog('Build Done...')
        const distFolderPath=path.join(__dirname,'output','dist')
        const distFolderContent=fr.readdirSync(distFolderPath,{recursive:true})
        publishLog(`start uploading... ${filePath}`)

        for (const file of distFolderContent) {
            const filePath=path.join(distFolderPath,file)
            if(fs.lstatSync(filePath).isDirectory()) continue;
            console.log('UPLOADED',filePath)
            publishLog(`uploaded ${filePath}`)
            const command=new PutObjectCommand({
                Bucket: 'DeployBoy',
                Key: '__outputs/${PROJECT_ID}/${file}',
                Body: fs.createReadStream(filePath),
                ContentType:mime.lookup(filePath)
            })
            await S3Client.send(command)
        }
        publishLog('Done')
        console.log('Done')
    })
 }

 init()