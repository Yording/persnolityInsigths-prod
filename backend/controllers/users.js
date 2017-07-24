'use strict'

// Depedencias
var executeQuery = require('../middlewares/executequery')
var service = require('../services/token')
    // Variables
var query = ''

module.exports = {
    // Seleccionar todos los usuarios de la base de dato
    getUsers: function(req, res) {
        query = "select [id], [rol_id], [nick], [email] from [user]"
        executeQuery(res, query)
    },
    // Función para crear un nuevo usuario
    createUser: function(req, res) {
        query = "INSERT INTO [user] ([rol_id], [nick], [email]) VALUES (1, '" + req.body.nick + "', '" + req.body.email + "')"
        executeQuery(res, query)
    },
    // Actualizar un usuario existente en la b.d
    updateUser: function(req, res) {
        query = "UPDATE [user] SET nick = '" + req.body.nick + "' , email=  '" + req.body.email + "'  WHERE Id= " + req.params.id
        executeQuery(res, query)
    },
    // Eliminar un usuario de la b.d
    deleteUser: function(req, res) {
        query = "DELETE FROM [user] WHERE Id = " + req.params.id
        executeQuery(res, query)
    },
    signIn: function(req, res) {
        var sql = require('mssql')
        query = `select [id], [rol_id], [nick], [email] from [user] where email = '${req.body.email}'`
            // crear un objecto request
        var request = new sql.Request();
        // query
        request.query(query, function(err, user) {
            if (err) {
                console.log("Error while querying database :- " + err);
                res.status(500).send(err);
            }
            else{
                if (user.recordset.length == 0) {
                    res.status(404).send({ message: 'No existe el usuario' })
                }
                else{
                    req.user = user
                    res.status(200).send({
                        message: "Te has logueado correctamente",
                        token: service.createToken(user)
                    })
                }
                
            }

        });
    }
}