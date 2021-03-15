const express = require('express')
const app = require('./src/app')

const port = process.env.PORT || 3001

app.listen(port, () => console.log(`server listen at ${port}`))