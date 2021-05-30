const express = require('express')
const bodyparser = require('body-parser')
const app = express()
const mysql = require('mysql')
const cors = require('cors')

const corsOptions ={
    origin:'*',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials:true,
    optionSuccessStatus:200
}

const conn = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'database'
})

app.use(cors(corsOptions))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded())

conn.connect(function(arr){
    if(arr)
        throw arr
})

app.get('/', function(req,res){
    res.send(`
        <form method="post" action="/todo" style="margin-right:15px">
            <input name="nama"/>
            <input type="submit" value="add_data"/>
        </form>
    `)
})

app.post('/todo',function(req,res){
    const sql = `INSERT INTO items (nama) VALUES (\'${req.body.nama}\')`
    conn.query(sql,function(arr){
        if(arr)
            throw arr
        console.log('Data Added Successfully')
    })
    res.end()
})

app.get('/todo',function(req,res){
    const sql = 'SELECT * FROM items'
    conn.query(sql,function(arr,result){
        if(arr)
            throw arr
        res.send(result)
        console.log(result)
    })
})

app.delete('/todo/:nama',function(req,res){
    const query = `DELETE FROM items WHERE nama=\'${req.params.nama}\'`
    conn.query(query,function(arr,result){
        if(arr)
            throw arr
        res.send("Data Deleted Successfully")
    })
})

app.listen(3000, () => {
    console.log('Server berjalan pada port 3000')
})
