'use strict'

const mongoose = require('mongoose');
const Product = mongoose.model('Product');

// Versão 1
// exports.get = () => {
//     return Product.find({
//         active: true
//     }, 'title price slug ');
// }

exports.get = async () => {
    const res = await Product.find({
        active: true
    }, 'title price slug ');
    return res;
}


exports.getBySlug = async (slug) => {
    const res = await Product
        .findOne({
            slug: slug,
            active: true
        }, 'title description price slug tags');

    return res;
}

exports.getById = async (id) => {
    const res = await Product
        .findById(id);
    return res;
}

exports.getByTag = async (tag) => {
    const res = await Product
        .find({
            tags: tag,
            active: true
        }, 'title description price slug tags');
    return res;
}

exports.create = async (data) => {
    var product = new Product(data);
    const res = await product.save();
}

exports.update = async (id, data) => {
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            sulg: data.slug
        }
    });
}

exports.delete = async (id) => {
    await Product
        .findOneAndRemove(id);
}