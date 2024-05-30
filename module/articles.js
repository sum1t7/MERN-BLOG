const mongoose = require('mongoose');
const slugify = require('slugify')
const marked = require('marked')
const createDomPurify = require('dompurify')
const {JSDOM} =  require('jsdom')
const dompurify = createDomPurify(new JSDOM().window)


 
  

const articleschema = mongoose.Schema({

    title:{
        required: true,
        type: String,
    },
    description: {
        type: String 
    },
    markdown: {
        type: String,
        required: true
       
    },
    Date:{
        type: Date,
        default: Date.now

    },

    slug:{
        type: String,
        required: true,
        unique: true
    },

    sanitizedHtml:{
        type: String,
        required: true
    }
}) 
articleschema.pre('validate', function(next){
    if(this.title){
        this.slug = slugify(this.title, {lower: true, strict: true})
    }
    
    if(this.markdown){
        this.sanitizedHtml = dompurify.sanitize(this.markdown)
    }
    next();
})



module.exports = mongoose.model('Article',articleschema)