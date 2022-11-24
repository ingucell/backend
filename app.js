var express = require('express')
var app = express();
const PORT  = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({extended: false}))

//routes
app.use('/register', require('./routes/api/register'))
app.use('/auth', require('./routes/api/auth'))


app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))





