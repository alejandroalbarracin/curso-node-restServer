const { Router}  = require ('express');
const { usersGet, userPost, userPut, userDelete, userPath } = require('../controllers/users');

const router = Router();

router.get('/', usersGet)

  router.put('/:id', userPut )


  router.post('/', userPost)


  router.delete('/', userDelete)

  router.patch('/', userPath)


module.exports = router