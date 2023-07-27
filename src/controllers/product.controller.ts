import { Request, Response } from 'express';
import Product from '../models/Product';

const getProducts = async (req: Request, res: Response) => {
    const products = await Product.find();
    res.send(products);
};

const countProducts = async (req: Request, res: Response) => {
    const count = await Product.countDocuments();
    res.json(count);
};

const deleteProducts = async (req: Request, res: Response) => {
    const { ids } = req.body;
    const { deletedCount } = await Product.deleteMany({ _id: { $in: ids } });
    res.status(200).json(deletedCount);
};

const createProduct = async (req: Request, res: Response) => {
    const { name, price, quantity, description } = req.body;
    const newProduct = new Product({
        price,
        name,
        quantity,
        description,
    });

    const product = await newProduct.save();
    res.status(201).json(product);
};

export default { getProducts, countProducts, deleteProducts, createProduct };
