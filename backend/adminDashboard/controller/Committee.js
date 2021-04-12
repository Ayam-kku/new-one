var adminCommittee = require('../model/admincommittee');

exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    // new committee
    const committee = new adminCommittee({
        name : req.body.name,
        description :req.body.description,
        task:req.body.task
        
    })

    // save committee in the database
    committee
        .save(committee)
        .then(data => {
            res.send(data)
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occurred while creating a create operation"
            });
        });

}

// retrieve and return all committee/ retrive and return a single committee
exports.find = (req, res)=>{

    if(req.query.id){
        const id = req.query.id;

        adminCommittee.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({ message : "Not found committee with id "+ id})
                }else{
                    res.send(data)
                }
            })
            .catch(err =>{
                res.status(500).send({ message: "Erro retrieving committee with id " + id})
            })

    }else{
        adminCommittee.find()
            .then(eventType => {
                res.send(eventType)
            })
            .catch(err => {
                res.status(500).send({ message : err.message || "Error Occurred while retriving committee information" })
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
    adminCommittee.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update committee with ${id}. Maybe committee not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update committee information"})
        })
}

exports.delete = (req, res)=>{
    const id = req.params.id;

    adminCommittee.findByIdAndDelete(id)
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Delete with id ${id}. Maybe id is wrong`})
            }else{
                res.send({
                    message : "Committee was deleted successfully!"
                })
            }
        })
        .catch(err =>{
            res.status(500).send({
                message: "Could not delete committee with id=" + id
            });
        });
}