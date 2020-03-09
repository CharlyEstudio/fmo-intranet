import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { UsuarioService } from '../services/services.index';
import { URL_SERVICIO_GENERAL, PUERTO_INTERNO } from '../config/config';

// Links

// Servicios

@Pipe({
  name: 'pdf'
})
export class PdfPipe implements PipeTransform {
  token: any = '';

  constructor(
    public sanitizer: DomSanitizer,
    private _usuarioS: UsuarioService
  ) {}

  transform(pdf: string, tipo: string): any {
    let url;

    url = URL_SERVICIO_GENERAL + ':' + PUERTO_INTERNO + '/resumen';

    if ( !pdf ) {
      return url + '/pdf/xxx';
    }

    if ( pdf.indexOf('https') >= 0 ) {
      return pdf;
    }

    let file;
    this.token = this._usuarioS.token;

    switch ( tipo ) {
      case 'proveedores':
        url += '/proveedores/pdf/' + pdf + '?token=' + this.token;

        file = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        break;
      case 'diasvtas':
        url += '/diasvtas/pdf/' + pdf + '?token=' + this.token;

        file = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        break;
      default:
        console.log('Tipo de formato no existe');
        return url += '/pdf/xxx';
    }

    return file;
  }

}
