import express from 'express';
import {getCourseByLevel, getAllCourses, createCourse, updateCourse, deleteCourse} from '../controller/courseController.js';

const route = express.Router();
route.get('/courses/:level', getCourseByLevel);
route.get('/courses', getAllCourses);
route.put('/courses/:level', updateCourse);
route.post('/courses', createCourse);
route.delete('/courses/:level', deleteCourse);

export default route;