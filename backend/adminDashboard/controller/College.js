var admincollegedb = require('../model/adminCollege');

exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new collage
    const college = new admincollegedb({
        name : req.body.name,
        building :req.body.building,
        link :req.body.link,
        
    })

    // save collage in the database
    college
        .save(college)
        .then(data => {
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all collages/ retrive and return a single collage
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        admincollegedb.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found collage with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving collage with id " + id})
            })

    }else{
        admincollegedb.find()
            .then(collage => {
                res.send(collage)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving collage information" })
            })
    }

    
}


exports.update = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    admincollegedb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update collage with ${id}. Maybe collage not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update collage information"})
        })
}

exports.delete = (req, res)=>{
    const id = req.params.id;

    admincollegedb.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "collage was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete collage with id=" + id
            });
        });
}