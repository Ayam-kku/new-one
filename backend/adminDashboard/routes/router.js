const express = require('express');
const route = express.Router()

const store = require('../middleware/Multer')

const Userscontroller = require('../controller/Users');
const collegecontroller = require('../controller/College');
const departmentcontroller = require('../controller/Department');
const clubcontroller = require('../controller/Club');
const CommitteeController = require('../controller/Committee')
const EventTypeController = require('../controller/EventType')
const EventReportController = require('../controller/EventReport')
const ClubPurchasesController = require('../controller/clubPurchases')





route.get('/',(req,res) => {
    res.send("<h1>This is the server .... </h1>")
});


// User API
route.post('/api/users', store.single('Userimg'), Userscontroller.create);
route.get('/api/users', Userscontroller.find);
route.put('/api/users/:id',store.single('Userimg'), Userscontroller.update);
route.delete('/api/users/:id', Userscontroller.delete);

//Collage API
route.post('/api/college',collegecontroller.create);
route.get('/api/college', collegecontroller.find);
route.put('/api/college/:id', collegecontroller.update);
route.delete('/api/college/:id', collegecontroller.delete);

//Department API
route.post('/api/department', departmentcontroller.create);
route.get('/api/department', departmentcontroller.find);
route.put('/api/department/:id', departmentcontroller.update);
route.delete('/api/department/:id', departmentcontroller.delete);

//Committee API
route.post('/api/committee', CommitteeController.create);
route.get('/api/committee', CommitteeController.find);
route.put('/api/committee/:id', CommitteeController.update);
route.delete('/api/committee/:id', CommitteeController.delete);

//Event-Type API
route.post('/api/event-type', EventTypeController.create);
route.get('/api/event-type', EventTypeController.find);
route.put('/api/event-type/:id', EventTypeController.update);
route.delete('/api/event-type/:id', EventTypeController.delete);

//Club API
route.post('/api/club', clubcontroller.create);
route.get('/api/club', clubcontroller.find);
route.put('/api/club/:id',store.single('Userimg'), clubcontroller.update);
route.put('/api/club/m/:id', clubcontroller.updateMmber);
route.put('/api/club/d/:id', clubcontroller.removeMember);
route.put('/api/club/d/event/:id', clubcontroller.removeEvent);
route.put('/api/club/e/:id', clubcontroller.updateEvent);
route.delete('/api/club/:id', clubcontroller.delete);


//EventReport API
route.post('/api/EventReport', store.single('Userimg'), EventReportController.create);
route.get('/api/EventReport', EventReportController.find);
route.put('/api/EventReport/:id', EventReportController.update);
route.delete('/api/EventReport/:id', EventReportController.delete);

//EventReport API
route.post('/api/club-purchases', store.single('Userimg'), ClubPurchasesController.create);
route.get('/api/club-purchases', ClubPurchasesController.find);
route.put('/api/club-purchases/:id', ClubPurchasesController.update);
route.delete('/api/club-purchases/:id', ClubPurchasesController.delete);

module.exports = route