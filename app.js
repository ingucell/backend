var express = require('express')
var app = express();
const PORT  = process.env.PORT || 5000




app.listen(PORT, ()=>console.log(`Server running on port ${PORT}`))





