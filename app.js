const express = require('express')
const app = express()
const port = 3000

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(express.static('public'));

const connect = require("./schemas");
connect();

const postRouter = require('./routers/posts');
app.use("/api", [postRouter]);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// 미들웨어
// app.use((req, res, next) => {
//     console.log(req);
//     next();
// });

app.get('/write', (req, res) => {
    res.render('write')
})

app.get('/write/:postNum', (req, res) => {
    const postNum = req.params;
    res.render('rewrite', {postNum: postNum});
})

app.get('/detail/:postNum', (req, res) => {
    const postNum = req.params;
    res.render('detail', {postNum: postNum});
})

app.get('/', (req, res, next) => {
    res.render('index');
});


app.listen(port, () =>{
    console.log(`listening at http://localhost:${port}`)
})