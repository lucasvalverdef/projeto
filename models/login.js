const db = require('./db')

const Post = db.sequelize.define('login', {
  usuario: {
       type: db.Sequelize.STRING
  },
  senha: {
        type: db.Sequelize.STRING
  }
})




Post.sync({force: true})
module.exports = Post
