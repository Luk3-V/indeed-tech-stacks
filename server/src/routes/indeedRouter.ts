import { Router, Response, Request, NextFunction } from "express";
const router = Router();
import * as controller from '../controllers/indeedController';

// ---------------------------------------------------------------------

// GET all data
router.get('/', controller.getAllData);

// GET all trends data
router.get('/trends', controller.getAllData);

// GET data by date (YYYY-MM-DD) OR by "newest"
router.get('/:date', controller.getData);

// POST new data for the current day
router.post('/', controller.createData);

// DELETE data by date (YYYY-MM-DD) OR by "newest"
router.delete('/:date', controller.deleteData);

// --------------------------------------------------------------------

export default router;