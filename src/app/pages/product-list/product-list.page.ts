// src/app/pages/product-list/product-list.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { forkJoin } from 'rxjs';
import { WishlistService } from 'src/app/services/wishlist.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: false // Esto es necesario si estás usando Angular 14+ y quieres usar este componente en un módulo que no sea el AppModule
})
export class ProductListPage implements OnInit {

  products: any[] = [];
  isLoading: boolean = true;
  pageTitle: string = 'Cargando...';
  categoryDescription: string = '';
  wishlistProductIds = new Set<number>(); 

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    private wishlistService: WishlistService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadCategoryData();
  }


  ionViewWillEnter() {
    // Esta función se ejecuta CADA VEZ que entras a la página.
    // Es ideal para actualizar la wishlist, ya que puede cambiar en otras partes de la app.
    if (this.authService.isLoggedIn()) {
      this.loadWishlist();
    } else {
      // Si el usuario cierra sesión, limpiamos los corazones marcados.
      this.wishlistProductIds.clear();
      this.updateLikedStatus();
    }
  }

  loadCategoryData() {
    this.route.paramMap.subscribe(params => {
      this.isLoading = true;
      const categoryIdString = params.get('id');

      if (categoryIdString) {
        const categoryId = +categoryIdString;
        const products$ = this.productService.getProductsByCategoryId(categoryId);
        const category$ = this.categoryService.getById(categoryId);

        forkJoin({ products: products$, category: category$ }).subscribe(
          ({ products, category }) => {
            this.products = products;
            this.pageTitle = category.nombre;
            this.categoryDescription = category.descripcion;
            this.isLoading = false;
            // -- PEQUEÑO PERO IMPORTANTE CAMBIO AQUÍ --
            // Una vez que tenemos los productos, verificamos cuáles están en la wishlist.
            this.updateLikedStatus(); 
          },
          (error) => {
            console.error('Error al cargar datos de la categoría', error);
            this.pageTitle = 'Error';
            this.categoryDescription = 'No se pudo cargar la información.';
            this.isLoading = false;
          }
        );
      }
    });
  }

  // --- Las siguientes 3 funciones son la lógica completa de la Wishlist ---

  loadWishlist() {
    this.wishlistService.getWishlist().subscribe(wishlistItems => {
      const ids = wishlistItems.map(item => item.id_producto);
      this.wishlistProductIds = new Set(ids);
      this.updateLikedStatus();
    });
  }

  updateLikedStatus() {
    this.products.forEach(p => {
      p.isLiked = this.wishlistProductIds.has(p.id_producto);
    });
  }

  toggleWishlist(product: any) {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/tabs/tab5']);
      return;
    }
    const productId = product.id_producto;
    product.isLiked = !product.isLiked;

    if (product.isLiked) {
      this.wishlistService.addToWishlist(productId).subscribe({
        next: () => this.wishlistProductIds.add(productId),
        error: () => { product.isLiked = false; }
      });
    } else {
      this.wishlistService.removeFromWishlist(productId).subscribe({
        next: () => this.wishlistProductIds.delete(productId),
        error: () => { product.isLiked = true; }
      });
    }
  }


}