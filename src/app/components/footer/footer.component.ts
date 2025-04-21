import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: false
})
export class FooterComponent  implements OnInit {


  constructor(private router: Router) { }

  ngOnInit() {}
  //funcion pa direccionar a mi perfil
  goToTab4() {
    this.router.navigate(['/tabs/tab4']);
  }

  goToTab5() {
    this.router.navigate(['/tabs/tab5']);
  }


}
