
import { customerTable } from "src/utils/environment";
import { db } from "../database/config";

class CustomerController {
    create(req, res) {
        const values = [
            req.body.name,
            req.body.email,
            req.body.phone_number,
            req.body.cityId,
            req.body.zip_code
        ];
        
        const q = `INSERT INTO customer (${customerTable}) VALUES (?)`;
        
        db.query(q, [values], (error, data) => {
            if (error) return res.send(error);
            return res.json(201).json(data);
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
                console.log(error);
                return res.json(error);
            }
            return res.status(200).json(data);
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
                console.log(error);
                return res.json(error);
            }
            return res.status(200).json(data);
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
            if (error) return res.status(204).send(error);
            return res.json({
                message: "Customer updated successfully"
            });
        });
    }

    destroy(req, res) {
        const id = [req.params.id];
        const q = "DELETE FROM customer WHERE id = ?";
    
        db.query(q, id, (error, data) => {
            if (error) return res.send(error);
            return res.status(202).json({
                message: "Customer deleted successfully"
            });
        });
    }
}

export default new CustomerController()