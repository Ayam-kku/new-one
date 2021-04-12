var sauClubdb = require('../model/sauClub');
const path = require('path')

exports.create = (req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    // new collage
    const club = new sauClubdb({
        clubName : req.body.clubName,
        clubType : req.body.clubType,
        college : req.body.college,
        pioneer : req.body.pioneer,
        president : req.body.president,
        member: req.body.member,
        Userimg: req.file === undefined ? "yazeed":req.file.path,
        clubInfo: req.body.clubInfo,
        activeClub:req.body.activeClub,
		event: req.body.event,
        statusofplan:req.body.statusofplan,
        notefrompioneer:req.body.notefrompioneer,
        notefromstu:req.body.notefromstu,
    })

    // save collage in the database
    club
        .save(club)
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

        sauClubdb.findById(id)
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
        sauClubdb.find()
            .then(club => {
                res.send(club)
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
    sauClubdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
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

    sauClubdb.findByIdAndDelete(id)
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

exports.updateMmber = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    sauClubdb.findByIdAndUpdate(id, 
        {
            $addToSet : req.body
        }, 
        { useFindAndModify: false})
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

exports.removeMember = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    sauClubdb.findByIdAndUpdate(id, 
        {
            $pull :{member:req.body} 
        }, 
        { useFindAndModify: false})
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


exports.updateEvent = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    sauClubdb.findByIdAndUpdate(id, 
        {
            $addToSet : req.body
        }, 
        { useFindAndModify: false})
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

exports.removeEvent = (req, res)=>{
    if(!req.body){
        return res
            .status(400)
            .send({ message : "Data to update can not be empty"})
    }

    const id = req.params.id;
    sauClubdb.findByIdAndUpdate(id, 
        {
            $pull :{event:req.body} 
        }, 
        { useFindAndModify: false})
        .then(data => {
            if(!data){
                res.status(404).send({ message : `Cannot Update event with ${id}. Maybe event not found!`})
            }else{
                res.send(data)
            }
        })
        .catch(err =>{
            res.status(500).send({ message : "Error Update even information"})
        })
}