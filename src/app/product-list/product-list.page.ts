// src/app/product-list/product-list.page.ts

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Importamos Router
import { ProductService } from '../services/product.service';
import { CategoryService, Category } from '../services/category.service';
// --- INICIO DE MODIFICACIÓN ---
import { WishlistService } from '../services/wishlist.service'; // 1. Importamos los servicios necesarios
import { AuthService } from '../services/auth.service';
// --- FIN DE MODIFICACIÓN ---

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.page.html',
  styleUrls: ['./product-list.page.scss'],
  standalone: false 
})

export class ProductListPage implements OnInit {
  products: any[] = [];
  categoryName: string = 'Productos';
  isLoading: boolean = true;
  categoryId: number | null = null;
  // --- INICIO DE MODIFICACIÓN ---
  wishlistProductIds = new Set<number>(); // 2. Añadimos el Set para guardar los IDs de la wishlist
  // --- FIN DE MODIFICACIÓN ---

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private categoryService: CategoryService,
    // --- INICIO DE MODIFICACIÓN ---
    private wishlistService: WishlistService, // 3. Inyectamos los servicios en el constructor
    private authService: AuthService,
    private router: Router
    // --- FIN DE MODIFICACIÓN ---
  ) { }

  ngOnInit() {
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.categoryId = +idParam;
      this.loadCategoryDetails(this.categoryId);
      this.loadProducts(this.categoryId);
    } else {
      console.error('No se encontró ID de categoría en la ruta.');
      this.isLoading = false;
    }
  }
  
  // --- INICIO DE MODIFICACIÓN ---
  // 4. Añadimos el hook ionViewWillEnter para recargar la wishlist cada vez que se entra a la página
  ionViewWillEnter() {
    if (this.authService.isLoggedIn()) {
      this.loadWishlist();
    } else {
      this.wishlistProductIds.clear();
      this.updateLikedStatus();
    }
  }
  // --- FIN DE MODIFICACIÓN ---

  loadCategoryDetails(id: number) {
    this.categoryService.getById(id).subscribe(
      (category: Category) => {
        this.categoryName = category.nombre;
      },
      (error: any) => {
        console.error('Error al cargar detalles de la categoría:', error);
        this.categoryName = 'Categoría Desconocida';
      }
    );
  }

  loadProducts(id: number) {
    this.isLoading = true;
    this.productService.getProductsByCategory(id).subscribe(
      (data) => {
        this.products = data;
        this.isLoading = false;
        // --- INICIO DE MODIFICACIÓN ---
        // 5. Después de cargar los productos, actualizamos el estado de "like"
        if (this.authService.isLoggedIn()) {
          this.loadWishlist();
        }
        // --- FIN DE MODIFICACIÓN ---
      },
      (error: any) => {
        console.error(`Error al cargar productos para la categoría ${id}:`, error);
        this.isLoading = false;
      }
    );
  }

  // --- INICIO DE MODIFICACIÓN ---
  // 6. COPIAMOS LOS 3 MÉTODOS SIGUIENTES DESDE TAB1.PAGE.TS
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
      this.router.navigate(['/tabs/tab5']); // Redirige a la página de login
      return;
    }

    const productId = product.id_producto;
    product.isLiked = !product.isLiked;

    if (product.isLiked) {
      this.wishlistService.addToWishlist(productId).subscribe({
        next: () => this.wishlistProductIds.add(productId),
        error: () => {
          product.isLiked = false;
          console.error('Error al añadir a la lista de deseos');
        }
      });
    } else {
      this.wishlistService.removeFromWishlist(productId).subscribe({
        next: () => this.wishlistProductIds.delete(productId),
        error: () => {
          product.isLiked = true;
          console.error('Error al quitar de la lista de deseos');
        }
      });
    }
  }
  // --- FIN DE LA MODIFICACIÓN ---
}