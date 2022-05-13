const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// const _ = require("lodash");
const mongoose = require('mongoose');
const app = express()
app.set("view engine","ejs")
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
mongoose.connect("mongodb://localhost:27017/wikidb")
const articleschema = {
 title: String,
 content: String
};
const Article = mongoose.model("article", articleschema);
app.route("/articles")
.get(function(req,res){
  Article.find({},function(err,found){
    if(err){
      console.log(err);
    }else{
      res.send(found)
    }
  })
})
.post(function(req,res){
  console.log(req.body.title,req.body.content);
  const newarticle = new Article ({
    title:req.body.title,
    content:req.body.content
  })
  newarticle.save(function(err){
    if(err){
      res.send(err)
    }else{
      res.send("successfully saved")
    }
  })
})
.delete(function(req,res){
  Article.deleteMany({},function(err){
    if(err){
      console.log(err);
    }else{
      console.log("collection deleted");
    }
  })
});

app.route("/articles/:title")
.get(function(req,res){
  Article.findOne({title:req.params.title},function(err,result){
    if(err){
      res.send(err)
    }else{
      res.send(result)
    }
  })
})
.put(function(req,res){
  Article.findOneAndUpdate({title:req.params.title},{title:req.body.title,content:req.body.content},{returnOriginal:false},function(err){
    if(err){
      res.send(err)
    }else{
      res.send("updated")
    }
  })
})
.patch(function(req,res){
  Article.findOneAndUpdate({title:req.params.title},{$set:req.body},{returnOriginal:false},function(err){
    if(err){
      res.send(err)
    }else{
      res.send("updated")
    }
  })

})
.delete(function(req,res){
  Article.deleteOne({title:req.params.title},function(err){
    if(err){
      res.send(err)
    }else{
      res.send("delete complete")
    }
  })
})
// app.get("/articles",function(req,res){
//   Article.find({},function(err,found){
//     if(err){
//       console.log(err);
//     }else{
//       res.send(found)
//     }
//   })
// })

// app.post("/articles",function(req,res){
//   console.log(req.body.title,req.body.content);
//   const newarticle = new Article ({
//     title:req.body.title,
//     content:req.body.content
//   })
//   newarticle.save(function(err){
//     if(err){
//       res.send(err)
//     }else{
//       res.send("successfully saved")
//     }
//   })
// })
// app.delete("/articles",function(req,res){
//   Article.deleteMany({},function(err){
//     if(err){
//       console.log(err);
//     }else{
//       console.log("collection deleted");
//     }
//   })
// })


























app.listen(3000,function(){
  console.log("appis active");
})
