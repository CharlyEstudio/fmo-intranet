// Rquires
var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;

// Inicializar variables
var app = express();

// Importar modelo de usuario
var Usuario = require('../models/usuario');

// Google
// var CLIENT_ID = require('../config/config').CLIENT_ID;
const { OAuth2Client } = require('google-auth-library');
// const client = new OAuth2Client(CLIENT_ID);

// var GoogleAuth = require('google-auth-library');
var GoogleAuth = OAuth2Client;
var auth = new GoogleAuth;

const GOOGLE_CLIENT_ID = require('../config/config').GOOGLE_CLIENT_ID;
const GOOGLE_SECRET = require('../config/config').GOOGLE_SECRET;

var mdAutenticacion = require('../middlewares/autenticacion');

// ======================================
// Función de Autenticación de Google
// ======================================
// async function verify(token) {
//     const ticket = await client.verifyIdToken({
//         idToken: token,
//         audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
//         // Or, if multiple clients access the backend:
//         //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
//     });

//     const payload = ticket.getPayload();
//     // const userid = payload['sub'];
//     // If request specified a G Suite domain:
//     //const domain = payload['hd'];

//     return {
//         nombre: payload.name,
//         email: payload.email,
//         img: payload.picture,
//         google: true
//     }
// }

// ======================================
// Autenticación de Google
// ======================================
app.get('/renuevatoken', mdAutenticacion.verificaToken, (req, resp) => {
    var token = jwt.sign({ usuario: req.usuario }, SEED, { expiresIn: 14400 }); // 4 horas expira
    resp.status(200).json({
        ok: true,
        token: token
    });
});

// ======================================
// Autenticación de Google
// ======================================
app.post('/google', async(req, res) => {

    var token = req.body.token || 'XXX';

    var client = new auth.OAuth2(GOOGLE_CLIENT_ID, GOOGLE_SECRET, '');

    client.verifyIdToken(
        token,
        GOOGLE_CLIENT_ID,
        function(e, login) {
            
            if (e) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Token Inválido',
                    errors: e
                });
            }

            var payload = login.getPayload();
            var userid = payload['sub'];

            Usuario.findOne({ email: payload.email }, (err, usuario) => {

                if (err) {
                    return res.state(500).json({
                        ok: false,
                        mensaje: 'Error al buscar usuario - login',
                        errors: err
                    });
                }

                if (usuario) {
                    if (usuario.google === false) {
                        return res.status(400).json({
                            ok: false,
                            mensaje: 'Debe de usar su autenticación normal'
                        });
                    } else {
                        usuario.password = ':)';

                        var token = jwt.sign({ usuario: usuario }, SEED, { expiresIn: 14400 }); // 4 horas

                        return res.status(200).json({
                            ok: true,
                            usuario: usuario,
                            token: token,
                            id: usuario_id,
                            menu: obtenerMenu(usuario.rol)
                        });
                    }
                } else {
                    var usuario = new Usuario();

                    usuario.nombre = payload.name;
                    usuario.email = payload.email;
                    usuario.password = ':)';
                    usuario.img = payload.picture;
                    usuario.google = true;

                    usuario.save((err, usuarioDB) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                mensaje: 'Error al crear usuario - google',
                                errors: err
                            });
                        }

                        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 Horas

                        res.status(200).json({
                            ok: true,
                            usuario: usuarioDB,
                            token: token,
                            id: usuario_id,
                            menu: obtenerMenu(usuarioDB.rol)
                        });
                    });
                }
            });
        }
    );
    
});

// ======================================
// Autenticación normal
// ======================================
app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuarios.',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorretcas - email',
                errors: { message: 'Credenciales incorretcas.' }
            });
        }

        if (!bcrypt.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorretcas - password',
                errors: { message: 'Credenciales incorretcas.' }
            });
        }

        // Crear un toke!!
        usuarioDB.password = ':)';
        var token = jwt.sign({ usuario: usuarioDB }, SEED, { expiresIn: 14400 }); // 4 horas expira

        res.status(200).json({
            ok: true,
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id,
            menu: obtenerMenu(usuarioDB.rol)
        });
    });
});

function obtenerMenu(ROLE) {
    // var menu = [{
    //     titulo: 'Principal',
    //     icono: 'mdi mdi-gauge',
    //     submenu: [
    //         { titulo: 'Dashboard', url: '/dashboard' },
    //         { titulo: 'ProgressBar', url: '/progress' },
    //         { titulo: 'Graficas 1', url: '/graficas1' },
    //         { titulo: 'Promesas', url: '/promesas' },
    //         { titulo: 'RXJS', url: '/rxjs' }
    //     ]
    // }];

    // if (ROLE === 'USER_ROLE') {
    //     // Menu Usuario Normal
    //     var menu = [{
    //         titulo: 'Principal',
    //         icono: 'mdi mdi-gauge',
    //         submenu: [
    //             { titulo: 'Dashboard', url: '/dashboard' }
    //         ]
    //     }];
    // }

    if (ROLE === 'DIR_ROLE' || ROLE === 'ADMIN_ROLE') {
        // Menu Usuario Administración & Direccion
        var menu = [{
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Dashboard', url: '/dashboardDir' }
            ]
        }];
    }else{
        var menu = [{
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Dashboard', url: '/dashboard' }
            ]
        }];
    }

    if (ROLE === 'ADMIN_ROLE') {
        // menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/usuarios' });
        menu.push(
            {
                titulo: 'Dirección',
                icono: 'mdi mdi-package-variant',
                submenu: [
                    { titulo: 'Diarios', url: '/diarios' }
                ]
            },
            {
                titulo: 'Mantenimientos',
                icono: 'mdi mdi-folder-lock-open',
                submenu: [
                    { titulo: 'Usuarios', url: '/usuarios' },
                    { titulo: 'Asesores', url: '/hospitales' },
                    { titulo: 'Clientes', url: '/medicos' }
                ]
            }
        );
    }

    return menu;
}

module.exports = app;