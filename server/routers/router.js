const router = require('express').Router()

router.get('/', (req, res) => {
  return res.send('Server is up and running');
})

module.exports = router