
import { customerTable } from "src/utils/environment";
import { db } from "../database/config";
const logger = require('../logs/logger')

class CustomerController {
    count(req, res) {
        const q = "SELECT COUNT(*) AS total FROM customer AS cr INNER JOIN city AS cy ON cr.cityId = cy.id"

        db.query(q, (error, data) => {
            if (error) {
                logger.error(`[GET: /customers/count] - ${error.message}`);
                return res.json(error);
            }
            
            return res.status(200).json(data[0]);
        });
    }

    create(req, res) {
        const values = [
            req.body.name,
            req.body.email,
            req.body.phone_number,
            req.body.cityId,
            req.body.zip_code
        ];
        
        const q = `INSERT INTO customer (${customerTable}) VALUES (?)`;
        
        db.query(q, [values], (error: Error, data) => {
            if (error) {
                logger.error(`[POST: /customers] - ${error.message}`);
                return res.status(400).send(error);
            }
            return res.status(201).json({ message: "Customer created successfully" });
        });
    }

    show(req, res) {
        const take = req.query.take || 10;
        const skip = req.query.skip || 0;

        const hasPagination = take < 0 || take > 100 ? 10 : take;

        const values = [Number(hasPagination), Number(skip)]
        const q = `
        SELECT 
            cr.id,
            cr.name AS customer,
            email,
            phone_number,
            zip_code,
            cy.name AS city
        FROM customer AS cr
        INNER JOIN city AS cy ON cr.cityId = cy.id 
        LIMIT ?
        OFFSET ?;
        `

        db.query(q, values, (error, data) => {
            if (error) {
                logger.error(`[GET: /customers] - ${error.message}`);
                return res.status(404).json(error);
            }
    
            return res.json({
                data: data,
                page: {
                    previous: skip <= 0 ? undefined: skip - 1,
                    current: skip,
                    next: skip + 1
                }
            });
        });
    }

    index(req, res) {
        const { id } = req.params
        const q = `
        SELECT 
            cr.name AS customer,
            email,
            phone_number,
            zip_code,
            cy.name AS city
        FROM customer AS cr
        INNER JOIN city AS cy ON cr.cityId = cy.id 
        WHERE cr.id = ?
        LIMIT 1;
        `
        
        db.query(q, id, (error, data) => {
            if (error) {
                logger.error(`[GET: /customers/:id] - ${error.message}`);
                return res.status(404).json(error);
            }

            return res.json(data);
        });
    }

    update(req, res) {
        const { id } = req.params;

        const values = [
            req.body.name,
            req.body.email,
            req.body.phone_number,
            req.body.cityId,
            req.body.zip_code
        ];

        const q = `
        UPDATE customer SET
            name = ?,
            email = ?,
            phone_number = ?,
            cityId = ?,
            zip_code = ?
        WHERE id = ?;
        `;

        db.query(q, [...values, id], (error, data) => {
            if (error) {
                logger.error(`[PUT: : /customers/:id] - ${error.message}`);
                return res.status(406).send(error);
            }

            return res.status(202).json({
                message: "Customer updated successfully"
            });
        });
    }

    destroy(req, res) {
        const id = [req.params.id];
        const q = "DELETE FROM customer WHERE id = ?";
    
        db.query(q, id, (error, data) => {
            if (error) {
                logger.error(`[DELETE: /customers/:id] - ${error.message}`);
                return res.status(405).send(error);
            }

            return res.status(204).json({
                message: "Customer deleted successfully"
            });
        });
    }
}

export default new CustomerController()