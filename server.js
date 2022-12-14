const express = require('express')
const app = express()
const port = 3000
app.use(express.static('app'))

app.get('/api', (request, response) => {
  console.log(request);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})