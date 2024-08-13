const CrudProduct = require("../module/crud.modules")

const addProduct = async (req, res) => {
     try {
          const { rasm, nomi, narxi, soni } = req.body
          const newProduct = new CrudProduct({ rasm, nomi, narxi, soni, })
          await newProduct.save();
          res.status(201).json(newProduct)
     } catch (error) {
          res.status(500).json({ message: "Ошибка при добавлении продукта", error })
     }
}

const getAllProduct = async (req, res) => {
     try {
          const products = await CrudProduct.find()
          res.status(200).json(products)
     } catch (error) {
          res.status(500).json({ message: "Ошибка при получении продуктов", error })
     }
}


const deleteProduct = async (req, res) => {
     try {
          const { id } = req.params;
          const deletedProduct = await CrudProduct.findByIdAndDelete(id);
          if (!deletedProduct) {
               return res.status(404).json({ message: "Продукт не найден" });
          }
          res.status(200).json({ message: "Продукт успешно удален" });
     } catch (error) {
          res.status(500).json({ message: "Ошибка при удалении продукта", error });
     }
};

const updateProduct = async (req, res) => {
     try {
          const { id } = req.params;
          const { rasm, nomi, narxi, soni } = req.body;

          const updatedProduct = await CrudProduct.findByIdAndUpdate(
               id,
               { rasm, nomi, narxi, soni },
               { new: true } // Вернуть обновленный документ
          );

          if (!updatedProduct) {
               return res.status(404).json({ message: "Продукт не найден" });
          }

          res.status(200).json(updatedProduct);
     } catch (error) {
          res.status(500).json({ message: "Ошибка при обновлении продукта", error });
     }
};
module.exports = { addProduct, getAllProduct, deleteProduct, updateProduct }