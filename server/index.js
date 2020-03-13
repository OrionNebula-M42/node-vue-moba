const express = require('express')
const app = express()
app.set('secret','fhasdjfas')
app.use(require('cors')())
app.use(express.json())
app.use('/upload', express.static(__dirname + '/uploads'))

require('./plugins/db')(app)
require('./routers/admin')(app)

app.listen(3000,() => {
    console.log('listen on 3000')
})