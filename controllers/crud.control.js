const OziqOvqat = require("../module/oziq-ovqat")
const SoldProduct = require("../module/sold-product")

const addProduct = async (req, res) => {
     try {
          const { nomi, kelgannarxi, sotishnarxi, soni, barcode } = req.body
          const newProduct = new OziqOvqat({ nomi, kelgannarxi, sotishnarxi, soni, barcode })
          await newProduct.save();
          res.status(201).json(newProduct)
     } catch (error) {
          res.status(500).json({ message: "Ошибка при добавлении продукта", error })
     }
}

const getAllProduct = async (req, res) => {
     try {
          const products = await OziqOvqat.find()
          res.status(200).json(products)
     } catch (error) {
          res.status(500).json({ message: "Ошибка при получении продуктов", error })
     }
}


const deleteProduct = async (req, res) => {
     try {
          const { id } = req.params;
          const deletedProduct = await OziqOvqat.findByIdAndDelete(id);
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
          const { nomi, kelgannarxi, sotishnarxi, soni, barcode } = req.body;

          const updatedProduct = await OziqOvqat.findByIdAndUpdate(
               id,
               { nomi, kelgannarxi, sotishnarxi, soni, barcode },
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

const sellProduct = async (req, res) => {
     try {
          const { nomi, kelgannarxi, sotishnarxi, soni, barcode } = req.body;

          // Создание нового документа в коллекции SoldProduct
          const newSoldProduct = new SoldProduct({ nomi, kelgannarxi, sotishnarxi, soni, barcode });
          await newSoldProduct.save();

          res.status(201).json(newSoldProduct);
     } catch (error) {
          res.status(500).json({ message: "Ошибка при сохранении проданного товара", error });
     }
};

const getSoldItems = async (req, res) => {
     try {
          const soldItems = await SoldProduct.find();
          res.status(200).json(soldItems);
     } catch (error) {
          res.status(500).json({ message: "Ошибка при получении проданных товаров", error });
     }
};


module.exports = { addProduct, getAllProduct, deleteProduct, updateProduct, sellProduct, getSoldItems }