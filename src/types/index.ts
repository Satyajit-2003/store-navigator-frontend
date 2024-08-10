export interface Store {
    _id: string;
    name: string;
    location: string | null;
    phone: string | null;
    email: string;
    website: string | null;
  }
  
  export interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: string;
    aisle: string;
  }
  