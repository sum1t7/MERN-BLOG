const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Article = require('./module/articles');
const articleRouter = require('./routes/article');
const methodOverride = require('method-override');
app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/blog');
app.use(express.urlencoded({ extended: false }));

app.get('/',async (req,res) =>{
    
    const article =await Article.find().sort({Date: 'desc'});
    res.render('index.ejs', { article: article});
} )


app.use(methodOverride('_method'));

app.use('/article',articleRouter);

app.listen(5000);






