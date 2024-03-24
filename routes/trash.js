const Trash = require("../models/trashModel");
const { protect, restrictTo } = require("../controllers/authController");
const router = require("express").Router();
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
const pluralize = require("pluralize");

dotenv.config();

router.get("/", protect, restrictTo("superAdmin"), async (req, res) => {
  try {
    const trashedDocuments = await Trash.aggregate([
      {
        $group: {
          _id: "$documentType",
          documents: {
            $push: {
              _id: "$_id",
              data: "$data",
              deletedAt: "$deletedAt",
            },
          },
        },
      },
    ]);

    res.json(trashedDocuments);
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post(
  "/:id/restore",
  protect,
  restrictTo("superAdmin"),
  async (req, res) => {
    try {
      const client = new MongoClient(process.env.MONGO_URI);
      const trashedDocument = await Trash.findById(req.params.id);
      const db = client.db(); // Get the default database from the MongoDB client
      const collectionName = pluralize.plural(
        trashedDocument.documentType.toLowerCase()
      );

      if (!trashedDocument) {
        return res
          .status(404)
          .json({ message: "Document not found in recycle bin" });
      }
      // Get the keys (field names) of the data object
      const fieldNames = Object.keys(trashedDocument.data);

      // Assuming you want to use the first field found
      const fieldName = fieldNames[1];
      const fieldValue = trashedDocument.data[fieldName];

      const query = { [fieldName]: fieldValue };
      console.log(collectionName);
      const updatedDocument = await db
        .collection(collectionName)
        .findOneAndUpdate(
          query,
          { $set: { deleted: false } }, // Use $set operator to update the deleted field
          { returnOriginal: false }
        );

      if (!updatedDocument) {
        // Handle case where the document to restore is not found
        await Trash.findByIdAndDelete(req.params.id);
        return res.status(404).json({
          message: "Original document not found, trashed document deleted",
        });
      }

      // Once the document is successfully restored, delete it from the trash
      await Trash.findByIdAndDelete(req.params.id);

      res.status(200).json({
        message: `${trashedDocument.documentType} document restored successfully`,
        restoredDocument: updatedDocument,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
);
router.delete(
  "/:id/delete",
  protect,
  restrictTo("superAdmin"),
  async (req, res) => {
    try {
      const trashedDocument = await Trash.findByIdAndDelete(req.params.id);
      res.status(200).json({
        message: `${trashedDocument.documentType} document deleted successfully`,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
);

module.exports = router;
