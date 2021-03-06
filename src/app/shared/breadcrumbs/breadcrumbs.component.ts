import { Component, OnInit } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Title, Meta } from "@angular/platform-browser";

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: []
})
export class BreadcrumbsComponent implements OnInit {

  titulo: string;
  name: string;

  constructor(private router: Router, private title: Title, private meta: Meta) {
    this.getDataRoute().subscribe( data => {
      this.titulo = data.titulo;
      this.name = data.name;
      this.title.setTitle(this.titulo);

      const metaTag = {
        name: this.name,
        content: this.titulo
      };

      this.meta.updateTag( metaTag );
    })
  }

  ngOnInit() {
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map ( (evento: ActivationEnd) => evento.snapshot.data )
    );

  }

}
