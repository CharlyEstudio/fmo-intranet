// Rquires
var express = require('express');

// Librerias
var fileUpload = require('express-fileupload');
var fs = require('fs');

// Inicializar variables
var app = express();

// default options
app.use(fileUpload());

// Modelos
var Usuario = require("../models/usuario");
var Medico = require("../models/medico");
var Hospital = require("../models/hospital");

app.put('/:tipo/:id', (req, res) => {
    var tipo = req.params.tipo;
    var id = req.params.id;

    // Tipos de colección
    var tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no es válida!',
            errors: { message: 'Tipo de colección no es válida!' }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No subio el imagén al servidor!',
            errors: { message: 'Debe de seleccionar una imagen!' }
        });
    }

    // Obtener el nombre del archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Solo estas extensiones aceptamos
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extensión no válida!',
            errors: { message: 'Las extensiones válidas son: ' + extensionesValidas.join(', ') }
        });
    }

    // Nombre de archivo personalizado
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds()}.${extensionArchivo}`;

    // Mover el archivo a un path
    var path = `./uploads/${ tipo }/${ nombreArchivo }`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover el archivo!',
                errors: err
            });
        }

        subirPorTipo(tipo, id, nombreArchivo, res);
    });
});

function subirPorTipo(tipo, id, nombreArchivo, res) {
    switch (tipo) {
        case 'usuarios':
            Usuario.findById(id, (err, usuario) => {
                if (!usuario) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Usuario no existe.',
                        error: { message: 'Usuario no existe' }
                    });
                }

                var pathViejo = './uploads/usuarios/' + usuario.img;

                // Si existe, elimina la imagén anterior
                if (fs.existsSync(pathViejo)) {
                    // fs.unlink(pathViejo);
                    fs.unlinkSync(pathViejo);
                }

                usuario.img = nombreArchivo;

                usuario.save((err, usuarioActualizado) => {
                    usuarioActualizado.password = ':)';

                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Imagén de usuario actualizada',
                        usuario: usuarioActualizado
                    });
                });
            });
            break;
        case 'medicos':
            Medico.findById(id, (err, medico) => {
                if (!medico) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Médico no existe.',
                        error: { message: 'Médico no existe' }
                    });
                }

                var pathViejo = './uploads/medicos/' + medico.img;

                // Si existe, elimina la imagén anterior
                if (fs.existsSync(pathViejo)) {
                    // fs.unlink(pathViejo);
                    fs.unlinkSync(pathViejo);
                }

                medico.img = nombreArchivo;

                medico.save((err, medicoActualizado) => {
                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Imagén de médico actualizada',
                        medico: medicoActualizado
                    });
                });
            });
            break;
        case 'hospitales':
            Hospital.findById(id, (err, hospital) => {
                if (!hospital) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Hospital no existe.',
                        error: { message: 'Hospital no existe' }
                    });
                }

                var pathViejo = './uploads/hospital/' + hospital.img;

                // Si existe, elimina la imagén anterior
                if (fs.existsSync(pathViejo)) {
                    // fs.unlink(pathViejo);
                    fs.unlinkSync(pathViejo);
                }

                hospital.img = nombreArchivo;

                hospital.save((err, hospitalActualizado) => {
                    return res.status(200).json({
                        ok: true,
                        mensaje: 'Imagén de hospital actualizada',
                        hospital: hospitalActualizado
                    });
                });
            });
            break;
        default:
            res.status(400).json({
                ok: false,
                message: 'Los tipos de coleccion sólo son: usuarios, médicos y hospitales.',
                error: { message: 'Tipo de tabla/colección no válida' }
            });
    }
}

module.exports = app;