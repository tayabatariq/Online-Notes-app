// const express = require("express");
// const app = express();
// app.use((req,res,next)=>{
//     console.log("middle wares runing")
//     next()
// })
// app.get("/", (req, res) => {
//   res.send("Routes only slash page");
// });
// app.get("/profile", (req, res) => {
//   res.send("Profile Route");
// });
// app.use((err, req, res, next) => {
//     console.error(err.stack)
//     res.status(500).send('Something broke!')
//   })
// app.listen(3000);


const express=require("express")
const app = express()
const path=require("path")
const fs=require("fs")

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.set("view engine","ejs")
app.use(express.static(path.join(__dirname,'public')))
app.get("/",(req,res)=>{
    fs.readdir(`./files`,(err,files)=>{
        console.log(files)
    res.render("index",{files:files})


    })
})
app.get("/files/:filename",(req,res)=>{
  fs.readFile(`./files/${req.params.filename}`,"UTF-8",function(err,filedata){
    console.log(filedata)
    res.render('show',{filename:req.params.filename,filedata:filedata})
    
  })
})
app.get('/edit/:filename',(req,res)=>{
    res.render("edit",{filename:req.params.filename})
})

app.post("/create",(req,res)=>{
    fs.writeFile(`./files/${req.body.title.split(" ").join('')}.txt`,req.body.details,(err)=>{
        res.redirect("/")

    })
})

app.listen(3000,function(){
    console.log("server runing")
})