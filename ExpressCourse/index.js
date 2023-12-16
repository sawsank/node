const express = require('express')
const app = express()
const port = 3000
let bodyParser = require("body-parser")
let multer = require('multer')
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    //const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    //get file extension
    let exten = 
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})
const upload = multer({ storage: storage })
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/upload',upload.single('image'), (req, res) => {
  res.send('success!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})