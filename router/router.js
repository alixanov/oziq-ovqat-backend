
const { Router } = require("express")
const router = Router()
const { addProduct, getAllProduct, deleteProduct, updateProduct } = require("../controllers/crud.control")

router.post("/add", addProduct)

router.get("/getall", getAllProduct)

router.delete("/delete/:id", deleteProduct); // New route for deleting a product

router.put("/update/:id", updateProduct); // Новый маршрут для обновления


module.exports = router