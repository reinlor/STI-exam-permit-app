import express from 'express';
import {createStudent, getAllStudents, getStudentByName, getStudentByID, updateStudent, uploadFile} from '../controller/studentController.js';

const route = express.Router();
route.post('/students', createStudent);
route.get('/students', getAllStudents);
route.get('/students/:uid', getStudentByID);
route.get('/students/name/:name', getStudentByName);
route.put('/students/:uid', updateStudent);

route.post("/studentPic", uploadFile);
export default route;