const expression = require('express');
const {generateSlug} = require('random-word-slugs')
const {ECSClient,RunTaskCommand}=require('@aws-sdk/client-s3');
const { LaunchType } = require('@aws-sdk/client-ecs');
const Redis = require('ioredis')
const {} =reqiure('socket.io')




const app=express();
const port =9000
app.use(express.json())

const subscriber = new Redis('') 
const io = new ServerException({cors:'*'})
io.listen(90001,()=>console.log(`App running on port 9001`))

io.on('connection', (socket) => {
    socket.on('subscribe',channel=>{
        socket.join(channel)
        socket.emit('message',`joined ${channel}`)
    })
})

const ecsClient=new ECSClient({
    region:'ap-south-1',
    Credentials:{
        accessKeyId:env.idkey
        ,secretAccessKey:env.skey
    }
})

const config = {
    CLUSTER: '',
    TASK: ''
}

app.post('/project',async (req,res)=>{
    const {gitURL,slug} =req.body
    const projectSlug =slug ? slug:generateSlug()
    const command = new RunTaskCommand({
        cluster: config.CLUSTER,
        taskDefinition: config.TASK,
        LaunchType: 'FARGATE',
        count: 1,
        networkconfiguration: {
            awsvpcConfiguration: {
                assignedPublicIp: 'ENABLED',
                subnets: ['subnet-0b7b6b6b'],
                securityGroups: ['sg-0b7b6b6b'],
        }
        },
        overrides:{
            containerOverrides:[
                {
                    name:'builder-imag',
                    environment:[
                        {
                            name:'GIT_URL',
                            value:gitURL
                        },
                        {
                            name:'PROJECT_ID',
                            value:projectSlug
                        }
                    ]
                }
            ]
        }
    })
    await ecsClient.send(command)
    return response.json({status: 'queued',data :{projectSlug,url: `http://${projectSlug}localhost:8000`}})
})


async function initRedisSubscribe(){
    console.log('subscribed to logs...')
    subscriber.psubscribe('logs:*')
    subscriber.on('pmessage', (pattern, channel, message) => {
        io.to(channel).emit('message', message)

    })
}

initRedisSubscribe()

app.listen(port,()=>console.log(`reverse proxy on ${port}`));