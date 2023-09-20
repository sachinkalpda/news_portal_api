const Category = require("../../../models/Category")
// getting static  category data 
const categories = require('../../../data/categoryData');

module.exports.add =  function(req, res){
    try {
        // adding category data to db
        categories.forEach(async (item) => {
            await Category.create({
                name : item.name,
                status : item.status
            })
        });
        return res.status(201).json({
            success : true,
            message : 'Categories Added To Database'
        })
    } catch (error) {
        console.log('Error in adding categories',error);
        return res.status(500).json({
            success : false,
            message : 'Internal Server Error'
        });
    }

}


module.exports.getAllCategories = async function(req, res){
    try {
        // getting all cateogries from database
        const categories = await Category.find({status : 1});
        if(categories){
            return res.status(200).json({
                success : true,
                message : `Total ${categories.length} Categories Found`,
                categories 
            })
        }
        return res.status(400).json({
            success : false,
            message : "Something Went Wrong!"
        })
    } catch (error) {
        console.log('Error in Getting Categories',error);
        return res.status(500).json({
            success : false,
            message : "Internal Server Error"
        })
    }
}