export type TBike = {
    id: string;
    _id: string;
    name: string;
    model: string;
    brand: string;
    category: 'Mountain' | 'Road' | 'Hybrid' | 'Electric';
    description: string;
    price: number;
    quantity: number;
    inStock: boolean;
    bikeImg: string;
    createdAt: string;
    updatedAt: string;
    };
    
    export type TRBike =
    {
      data:TBike,
      message:string,
      status:boolean
  
    }