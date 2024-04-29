import express from "express";
import { addItem, listItem, removeItem} from "../controllers/marketController.js";
import multer from "multer"

const marketRouter = express.Router();

//image storage 
const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null,` ${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

marketRouter.post("/add", upload.single("image"), addItem)
marketRouter.get("/list", listItem);
marketRouter.post("/remove",removeItem);

export default marketRouter;