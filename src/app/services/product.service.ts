import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: "Diamond Pendant",
      price: 999.99,
      description: "Elegant diamond pendant in 18k white gold",
      image: "../../assets/images/pendant.jpg",
      category: "necklaces"
    },
    {
      id: 2,
      name: "Sapphire Ring",
      price: 1299.99,
      description: "Beautiful sapphire ring with diamond accents",
      image: "../../assets/images/sapphire.jpg",
      category: "rings"
    },
    {
      id: 3,
      name: "Pearl Earrings",
      price: 499.99,
      description: "Classic pearl earrings with 14k gold settings",
      image: "../../assets/images/pearl.jpg",
      category: "earrings"
    },
    {
      id: 4,
      name: "Ruby Bracelet",
      price: 799.99,
      description: "Stunning ruby bracelet with diamond details",
      image: "../../assets/images/ruby.jpg",
      category: "bracelets"
    }
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return of(this.products.filter(product => product.category === category));
  }

  getProductById(id: number): Observable<Product | undefined> {
    return of(this.products.find(product => product.id === id));
  }
}
