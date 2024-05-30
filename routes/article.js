const express = require('express');
const router = express.Router();
const Article = require('../module/articles.js');
const { render } = require('ejs');


router.get('/new',(req,res)=>{
res.render('new.ejs',  {article: new Article()})
})

router.get('/:slug' , async (req,res)=>{
    const article = await Article.findOne({slug: req.params.slug})
    
    if (article == null) 
       { res.redirect('/')}
    else{

        res.render('show.ejs', {article: article})
    }
})
router.post('/', async (req,res)=>{
 let article = new Article({
    title: req.body.title,
    description: req.body.description,
    markdown: req.body.markdown
 })

try {
    article = await article.save()
    res.redirect(`/article/${article.slug}`)
}

catch(e){
    console.log(e)
    res.render('new.ejs', {article: article})
}
})

router.delete('/:id', async(req,res)=> {
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})


module.exports = router;
 
