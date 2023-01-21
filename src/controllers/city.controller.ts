import { Request, Response } from "express";
import { db } from "src/database/config";
const logger = require('../logs/logger');

class CityController {
    show(req: Request, res: Response) {
        const search = req.query.q || '';
        const take = req.query.take || 10;
        const skip = req.query.skip || 0;

        const hasPagination = take < 0 || take > 100 ? 10 : take;
        const values = [Number(hasPagination), Number(skip)] // [search, hasPagination, skip]
        const q = "SELECT * FROM city LIMIT ? OFFSET ?";

        db.query(q, values, (error: Error, data) => {
            if (error) {
                logger.error(`[GET: /cities] - ${error.message}`);
                return res.status(404).json({ message: error.message });
            };

            return res.json(data);
        })
    }

    index(req: Request, res: Response) {
        const id = req.params.id;
        const q = "SELECT * FROM city WHERE id = ?";

        db.query(q, id, (error: Error, data) => {
            if (error) {
                logger.error(`[GET: /cities/:id] - ${error.message}`);
                return res.status(404).json({ message: error.message });
            }
            
            return res.json(data[0]);
        })
    }
}

export default new CityController()