import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone: false
})
export class ProductCardComponent  implements OnInit {

  @Input() image: string = '';
  @Input() brand: string = '';
  @Input() title: string = '';
  @Input() price: number = 0;
  @Input() previousPrice?: number;



  constructor() { }

  ngOnInit() {}

}
