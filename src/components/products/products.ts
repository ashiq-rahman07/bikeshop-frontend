import Img1 from "../../assets/bike/electrical/MXV-e1708594139730.png"
import Img2 from "../../assets/bike/road/Gallery_1920x1080_2-WEB.jpg";
import Img3 from "../../assets/bike/hybrid/new-ultraviolette-4.jpeg";

export interface Product {
    id: number;
    name: string;
    brand: string;
    category: string;
    price: number;
    model: string;
    availability: boolean;
    image: string;
  }
  
  export const products: Product[] = [
    {
      id: 1,
      name: 'Sport Bike X1',
      brand: 'Yamaha',
      category: 'Sport',
      price: 12000,
      model: '2024',
      availability: true,
      image:Img1,
    },
    {
      id: 2,
      name: 'Cruiser Bike C2',
      brand: 'Harley-Davidson',
      category: 'Cruiser',
      price: 15000,
      model: '2023',
      availability: true,
      image: Img2,
    },
    {
      id: 3,
      name: 'Adventure Bike A3',
      brand: 'KTM',
      category: 'Adventure',
      price: 14000,
      model: '2024',
      availability: false,
      image: Img3,
    },
    {
      id: 4,
      name: 'Adventure Bike A3',
      brand: 'KTM',
      category: 'Adventure',
      price: 14000,
      model: '2024',
      availability: false,
      image: Img3,
    },
    {
      id: 5,
      name: 'Adventure Bike A3',
      brand: 'KTM',
      category: 'Adventure',
      price: 14000,
      model: '2024',
      availability: false,
      image: Img3,
    },
    {
      id: 6,
      name: 'Adventure Bike A3',
      brand: 'KTM',
      category: 'Adventure',
      price: 14000,
      model: '2024',
      availability: false,
      image: Img3,
    },
    // Add more products as needed
  ];