import { Request, Response } from "express";
import { db } from "src/database/config";
const logger = require('../logs/logger');

class SalesRegistrationController {
    create(req: Request, res: Response) {
        const { customerId, productId } = req.body;

        const q = "INSERT INTO customer_product(customerId,productId) VALUES (?,?);";

        db.query(q, [customerId, productId], (error: Error, data) => {
            if (error) {
                logger.error(`[GET: /customers/purchase] - ${error.message}`);
                return res.status(400).json({ message: error.message });
            }

            return res.status(201).json({
                message: "Successful Purchase",
                data: { customerId, productId }
            });
        })
    }

    show(req: Request, res: Response) {
        const { customerId } = req.params;

        const q = `
        SELECT 
            cp.id,
            cr.name as customer,
            cr.phone_number,
            ct.name AS city,
            pr.produto,
            pr.cEan AS barcode,
            unidade_comercial_produto,
            preco_comercial_produto,
            preco_tributavel_produto
        FROM customer_product cp
        INNER JOIN customer cr ON cr.id = cp.customerId
        INNER JOIN product pr ON pr.id = cp.productId
        INNER JOIN city ct ON ct.id = cr.cityId
        WHERE cr.id = ?;
        `

        db.query(q, [customerId], (error: Error, data) => {
            if (error) {
                logger.error(`[GET: /customers/:customerId/purchase] - ${error.message}`);
                return res.status(404).json({ message: error.message });
            }

            return res.status(200).json(data);
        });
    }

    index(req: Request, res: Response) {
        const { customerId, purchaseId } = req.params;

        const q = `
        SELECT 
            cp.id,
            cr.name as customer,
            cr.phone_number,
            ct.name AS city,
            pr.produto,
            pr.cEan AS barcode,
            unidade_comercial_produto,
            preco_comercial_produto,
            preco_tributavel_produto
        FROM customer_product cp
        INNER JOIN customer cr ON cr.id = cp.customerId
        INNER JOIN product pr ON pr.id = cp.productId
        INNER JOIN city ct ON ct.id = cr.cityId
        WHERE  cr.id = ?
        AND cp.id = ?;
        `;

        db.query(q, [customerId, purchaseId], (error: Error, data) => {
            if (error) {
                logger.error(`[GET: /customers/:customerId/purchase/:purchaseId] - ${error.message}`);
                return res.status(404).json({ message: error.message });
            }

            return res.status(200).json(data[0]);
        });
    }

    destroy(req: Request, res: Response) {
        const { id } = req.params;

        const q = "DELETE FROM customer_product WHERE id = ?;";

        db.query(q, [id], (error: Error, data) => {
            if (error) {
                logger.error(`[DELETE: /customers/purchase/:id] - ${error.message}`);
                return res.status(405).json({ message: error.message });
            }
            
            return res.status(204).json({ message: "Purchase  deleted successfully" });
        });
    }
}

export default new SalesRegistrationController();