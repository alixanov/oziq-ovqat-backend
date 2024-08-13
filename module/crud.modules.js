const { Schema, model } = require("mongoose")
const ProductSchema = new Schema({
     rasm: {
          type: String,
          required: true,
     },
     nomi: {
          type: String,
          required: true,
          minlenght: 3,
     },
     soni: {
          type: String,
          required: true,
          minlenght: 3,
     },
     narxi: {
          type: String,
          required: true,
          minlenght: 3,
     }


})
module.exports = model("CrudProduct", ProductSchema)