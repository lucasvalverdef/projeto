const db = require('./db')

const Post = db.sequelize.define('cliente', {
    nomeC: {
        type: db.Sequelize.STRING
    },
    emailC: {
        type: db.Sequelize.STRING
    },
    foneC: {
        type: db.Sequelize.STRING
    }
})  

const fornec = db.sequelize.define('fornecedore', {
    txtnome: {
        type: db.Sequelize.STRING
    },
    txtcep: {
        type: db.Sequelize.STRING
    },
    txtnumero: {
        type: db.Sequelize.STRING
    },
    txttelefone: {
        type: db.Sequelize.STRING
    },
    txtemail: {
        type: db.Sequelize.STRING
    },
    txtcnpj: {
        type:db.Sequelize.STRING
    },
    textfornecedor: {
        type:db.Sequelize.STRING
    }  
})

//fornec.sync({force: true})
//cliente.sync({force: true})
module.exports = Post