import itemModel from "../models/marketModel.js"
import fs from 'fs'

//add market  items

const addItem = async (req, res) => {
    let image_filename = `${req.file.filename}`;

    const item = new itemModel({
        name: req.body.name, 
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    })
    try {
        await item.save() 
        res.json({success:true, message: "Item Added"})
    } catch(error) {
        console.log(error)
        res.json({sucess:false, message:"Error"})
    }
}

const listItem = async (req, res) => {
    try {
        const items = await itemModel.find({});
        res.json({success:true, data:items });
    } catch (error) {
        console.log(error);
        res.json({success:false, message: error}); 
    }
}

const removeItem = async (req, res) => {
    try {
        const item = await itemModel.findById(req.body.id);
        fs.unlink(`uploads/${item.image}`, () => {})

        await itemModel.findByIdAndDelete(req.body.id);
        res.json({success: true, message: "Item removed"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error "})
    }
}


export {addItem, listItem, removeItem}