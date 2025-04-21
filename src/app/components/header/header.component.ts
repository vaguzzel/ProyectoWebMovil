import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false
})
export class HeaderComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  //funcion pa direccionar a mi perfil
  goToTab2() {
    this.router.navigate(['/tabs/tab2']);
}
goToTab1() {
  this.router.navigate(['/tabs/tab1']);
}
}