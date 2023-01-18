import { Request, Response } from "express";
import { db } from "src/database/config";
import { productTable } from "src/utils/environment";

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

        db.query(q, [values], (error, data) => {
            if (error) return res.send(error);
            return res.json(201).json(data);
        })
    }

    index(req: Request, res: Response) {
        const id = req.params.id;

        const values = [id]

        const q = "SELECT * FROM product WHERE id = ? LIMIT 1;"; 
        
        db.query(q, values, (error, data) => {
            if (error) {
                console.log(error);
                return res.json(error);
            }

            return res.status(200).json(data);
        });
    }

    show(req: Request, res: Response) {
        const take = req.query.take || 10;
        const skip = req.query.skip || 0;

        const hasPagination = take < 0 || take > 100 ? 10 : take;
        const values = [Number(hasPagination), Number(skip)];

        const q = "SELECT * FROM product LIMIT ? OFFSET ?;";
        
        db.query(q, values, (error, data) => {
            if (error) {
                console.log(error);
                return res.json(error);
            }
            return res.status(200).json(data);
        });
    }

    update(req: Request, res: Response) {
        const id = req.params.id;
        const values = [req.body.produto];

        const q = "UPDATE product SET `produto`= ? WHERE id = ?";

        db.query(q, [...values, id], (error, data) => {
            if (error) return res.send(error);
            return res.json(data);
        });
    }

    delete(req: Request, res: Response) {
        const id = req.params.id;
        const q = "DELETE FROM product WHERE id = ?";
    
        db.query(q, [id], (error, data) => {
            if (error) return res.send(error);
            return res.status(202).json({
                message: "Product deleted successfully"
            });
        });
    }
}

export default new ProductController()