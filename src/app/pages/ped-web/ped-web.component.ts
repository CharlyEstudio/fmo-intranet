import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-ped-web',
  templateUrl: './ped-web.component.html',
  styles: []
})
export class PedWebComponent implements OnInit {

  data: any[] = [];

  constructor(
    private router: ActivatedRoute
  ) {
    this.data = JSON.parse(this.router.snapshot.paramMap.get('data'));
    console.log(this.data);
  }

  ngOnInit() {
  }

}
