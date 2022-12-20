const { json } = require("body-parser");
const PRODUCTS = require("../model/products");

module.exports = {
    getProducts : async (req, res, next)=>{
        const products = await PRODUCTS.find();
        res.json({
            result : products.map(res =>{
                return {
                    id : res.id,
                    name : res.name,
                    desc : res.desc
                }
            })
        })
    },

    insertProduct : async (req, res)=>{
        try {const product = await new PRODUCTS ({
            name : req.body.name,
            price : req.body.price,
            desc : req.body.desc,

        }).save()
        res.json({"message" : "inserted successfully",
            id : product.id,
            name : product.name})}catch(err) {
                res.json({error : err.errors.name.message});
            }
    },

    deleteProducts : async (req, res)=> {
        const id = req.params.id;
        const del = await PRODUCTS.findByIdAndRemove(id);
        res.json({"delete" : del});
    },

    getElement : async (req, res)=> {
        const id = req.params.id;
        const product = await PRODUCTS.findById(id);
        res.json({product});
    }
}