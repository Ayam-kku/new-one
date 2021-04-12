var adminEventType = require('../model/adminEventType');

exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new collage
    const eventType = new adminEventType({
        name : req.body.name,
        description :req.body.description,
        
    })

    // save collage in the database
    eventType
        .save(eventType)
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

        adminEventType.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found event Type with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving event Type with id " + id})
            })

    }else{
        adminEventType.find()
            .then(eventType => {
                res.send(eventType)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving event Type information" })
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
    adminEventType.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update event Type with ${id}. Maybe event Type not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update event Type information"})
        })
}

exports.delete = (req, res)=>{
    const id = req.params.id;

    adminEventType.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "event Type was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete event Type with id=" + id
            });
        });
}