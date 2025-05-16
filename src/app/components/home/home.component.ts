import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, PLATFORM_ID, Inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { ProductService, Product } from '../../services/product.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('backgroundVideo') videoElement!: ElementRef<HTMLVideoElement>;
  products$: Observable<Product[]>;

  constructor(
    private productService: ProductService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.products$ = this.productService.getProducts();
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      // Only attempt video playback in browser environment
      const video = this.videoElement.nativeElement;
      
      // Handle video loading
      video.addEventListener('loadeddata', () => {
        if (video.paused) {
          video.play().catch(() => {
            // Fallback: try playing on user interaction
            document.addEventListener('click', () => {
              video.play().catch(() => {});
            }, { once: true });
          });
        }
      });
    }
  }
}
