var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

/*
 * VERIFICAR TOKEN
 */
exports.verificaToken = function(req, res, next) {
    var token = req.query.token;

    jwt.verify(token, SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: 'Token incorrecto.',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();
    });
}

/*
 * VERIFICAR ADMIN
 */
exports.verificaADMIN_ROLE = function(req, res, next) {
    var usuario = req.usuario;

    if (usuario.rol === 'ADMIN_ROLE') {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto.',
            errors: { message: 'No es administrador, no puede hacer eso.' }
        });
    }
}

/*
 * VERIFICAR ADMIN O MISMO USUARIO
 */
exports.verificaADMIN_o_MismoUsuario = function(req, res, next) {
    var usuario = req.usuario;

    var id = req.params.id;

    if (usuario.rol === 'ADMIN_ROLE' || usuario._id === id) {
        next();
        return;
    } else {
        return res.status(401).json({
            ok: false,
            mensaje: 'Token incorrecto.',
            errors: { message: 'No es administrador, no puede hacer eso.' }
        });
    }
}