// Including Modules after installing from NPM
const Joi = require('joi');
const express = require('express');
const app = express();
const fetch = require('node-fetch');
app.use(express.json());

// Declaring port as env var for instance if 3000 is unavailable
const port = process.env.PORT || 3000 ;

var jobs = null; // array to hold jobs-Json from mockaroo
 fetch('https://my.api.mockaroo.com/jobs?key=c985dcc0&content-type=application/json')
.then(res => res.json())
.then((out) =>  { jobs = out;
console.log(jobs)

app.get('/',(req, res) => {
    res.send(jobs);
});

app.get('/jobs/search', (req, res) => {
    const result = jobs.find(c => c.job_title === req.query.query);
    if (!result) res.status(404).send('The job with the given ID wasnt found')
    res.send(result);
});

app.listen(port, () => console.log('Listen on post :'+port));

app.post('/jobs/create', (req, res) =>{
   
   const schema = {
       job_title: Joi.string().min(3).required(),
       company: Joi.string().min(3).required()
   };
   const result =Joi.valid(req.body,schema);
   //validate
    
   
   console.log(result)
      

    const job = { id: jobs.length + 1, job_title: req.body.job_title, company:req.body.company}; // futher attributes
    jobs.push(job);
    res.send(job);
});


})   
.catch(err => { throw err });



