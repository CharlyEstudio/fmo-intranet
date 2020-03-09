import { NgModule } from '@angular/core';
import { ImagenPipe } from './imagen.pipe';
import { PdfPipe } from './pdf.pipe';

@NgModule({
  imports: [],
  declarations: [
    ImagenPipe,
    PdfPipe
  ],
  exports: [
    ImagenPipe,
    PdfPipe
  ]
})
export class PipesModule { }
