import { Request, Response } from "express";
import { db } from "src/database/config";
import { productTable } from "src/utils/environment";
const logger = require('../logs/logger')

class ProductController {
    create(req: Request, res: Response) {
        const values = [ 
            req.body.id, 
            req.body.produto,
            req.body.NCM,
            req.body.unidade_comercial_produto,
            req.body.preco_comercial_produto,
            req.body.unidade_tributavel_produto,
            req.body.preco_tributavel_produto,
            req.body.CFOP,
            req.body.CST,
            req.body.origem,
            req.body.situacao_tributaria,
            req.body.regime,
            req.body.PIS,
            req.body.cofins,
            req.body.cEan
        ];
        
        const q = `INSERT INTO product (${productTable}) VALUES (?)`;

        db.query(q, [values], (error: Error, data) => {
            if (error) {
                logger.error(`[GET: /products] - ${error.message}`);
                return res.status(400).send(error);
            }

            return res.status(201).json(data);
        })
    }

    index(req: Request, res: Response) {
        const id = req.params.id;
        const values = [id]
        const q = "SELECT * FROM product WHERE id = ? LIMIT 1;"; 
        
        db.query(q, values, (error: Error, data) => {
            if (error) {
                logger.error(`[GET: /products/:id] - ${error.message}`);
                return res.status(404).json(error);
            }

            return res.status(200).json({
                ...data[0],
                barcode: `https://bwipjs-api.metafloor.com/?bcid=ean13&text=${data[0].cEan}&includetext`
            });
        });
    }

    show(req: Request, res: Response) {
        const take = req.query.take || 10;
        const skip = req.query.skip || 0;

        const hasPagination = take < 0 || take > 100 ? 10 : take;
        const values = [Number(hasPagination), Number(skip)];

        const q = "SELECT * FROM product LIMIT ? OFFSET ?;";
        
        db.query(q, values, (error: Error, data) => {
            if (error) {
                logger.error(`[GET: /products] - ${error.message}`);
                return res.status(404).json(error);
            }

            return res.status(200).json(data);
        });
    }

    update(req: Request, res: Response) {
        const id = req.params.id;
        const values = [req.body.produto];
        const q = "UPDATE product SET `produto`= ? WHERE id = ?";

        db.query(q, [...values, id], (error: Error, data) => {
            if (error) {
                logger.error(`[PUT: /products/:id] - ${error.message}`);
                return res.status(406).send(error);
            }

            return res.status(202).json(data);
        });
    }

    destroy(req: Request, res: Response) {
        const id = req.params.id;
        const q = "DELETE FROM product WHERE id = ?";
    
        db.query(q, [id], (error: Error, data) => {
            if (error) {
                logger.error(`[DELETE: /products/:id] - ${error.message}`);
                return res.status(405).send(error);
            }
            
            return res.status(204).json({
                message: "Product deleted successfully"
            });
        });
    }
}

export default new ProductController()