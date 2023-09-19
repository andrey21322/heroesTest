const multer = require('multer');
const { JsonDB, Config } = require('node-json-db')

const db = new JsonDB(new Config("myDataBase", true, false, '/'));

const multerConfig = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './client/public/images');
    },
    filename: (req, file, callback) => {
        const ext = file.mimetype.split('/')[1]
        callback(null, `${file.originalname}`)
    }
})

const upload = multer({
    storage: multerConfig
})

exports.allHeroes = async (req, res) => {
    let data = await db.getData("/heroes");
    res.send(data)
}

exports.newHero = async (req, res) => {
    let heroes = req.body
    await db.push('/heroes', heroes)
}

exports.uploadImage = upload.single('photo')

exports.delImg = async (req, res) => {
    let heroes = req.body
    await db.push('/heroes', heroes)
}
