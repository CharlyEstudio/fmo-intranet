export function upNotification(cliente, nombre, comentario, remitente) {
    Push.create("Notificacion", {
        body: 'Mensaje de ' + remitente + ' del ' +
            cliente + ' ' + nombre +
            ', comentario: ' +
            comentario,
        icon: 'assets/images/users/fmo.png',
        timeout: 10000,
        onClick: function() {
            window.focus();
            this.close();
        }
    });
}