const express=require('express')
const httpProxy = require('http-proxy')
const app = express()
const port =8000

const proxy=httpProxy.createProxy()
const BASE_PATH=``
app.use((req,res,next)=>{
    const hostname=req.hostname
    const subdoamin=hostname.split('.')[0]

    const resolvesTO =`${BASE_PATH}/${subdoamin}`
   return   proxy.web(req,res,{target:resolvesTO,changeOrigin:true})
})

proxy.on('proxyRequest', (proxyReq,req,res)=>{
    const url=req.url
    if(url=='/') 
        proxyReq,path+='index.html'
    return proxyReq
    
})

app.listen(port,()=>console.log(`App running on port ${port}`))