
import { Order } from "../types";

export const orders: Order[] = [
  {
    id: "order-1",
    userId: "2",
    items: [
      {
        product: {
          id: "1",
          name: "Velocity Striker 750",
          brand: "Velocity",
          category: "Sport",
          model: "Striker 750",
          price: 9999,
          originalPrice: 11999,
          description: "The Velocity Striker 750 combines cutting-edge technology with sleek design for an unmatched riding experience.",
          features: [
            "Advanced fuel injection system",
            "Dual-channel ABS",
            "Digital instrument cluster"
          ],
          specifications: {
            "Engine": "749cc DOHC Inline-4",
            "Power": "125 HP @ 12,000 rpm"
          },
          stock: 5,
          images: [
            "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop"
          ],
          rating: 4.8,
          reviewCount: 24,
          isFeatured: true
        },
        quantity: 1
      }
    ],
    totalAmount: 9999,
    status: "processing",
    paymentMethod: "Credit Card",
    shippingAddress: {
      fullName: "John Doe",
      streetAddress: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "12345",
      country: "USA",
      phone: "555-123-4567"
    },
    orderDate: "2023-04-15T10:30:00Z",
    estimatedDeliveryDate: "2023-04-25T00:00:00Z"
  },
  {
    id: "order-2",
    userId: "3",
    items: [
      {
        product: {
          id: "3",
          name: "UrbanScoot City Navigator",
          brand: "UrbanScoot",
          category: "Scooter",
          model: "City Navigator",
          price: 2999,
          originalPrice: 3499,
          description: "Perfect for urban commuting, the City Navigator scooter combines efficiency, style, and practicality.",
          features: [
            "Automatic transmission",
            "Under-seat storage",
            "USB charging port"
          ],
          specifications: {
            "Engine": "125cc Single-cylinder, air-cooled",
            "Power": "9.5 HP @ 8,000 rpm"
          },
          stock: 15,
          images: [
            "https://images.unsplash.com/photo-1619771914272-e3b83056ac56?w=800&h=600&fit=crop"
          ],
          rating: 4.6,
          reviewCount: 52,
          isFeatured: false
        },
        quantity: 1
      }
    ],
    totalAmount: 2999,
    status: "shipped",
    paymentMethod: "PayPal",
    shippingAddress: {
      fullName: "Jane Smith",
      streetAddress: "456 Oak Ave",
      city: "Somewhere",
      state: "NY",
      postalCode: "67890",
      country: "USA",
      phone: "555-987-6543"
    },
    orderDate: "2023-04-10T14:20:00Z",
    estimatedDeliveryDate: "2023-04-20T00:00:00Z"
  },
  {
    id: "order-3",
    userId: "2",
    items: [
      {
        product: {
          id: "6",
          name: "ClassicMotors Vintage Roadster",
          brand: "ClassicMotors",
          category: "Classic",
          model: "Vintage Roadster",
          price: 12499,
          description: "A modern classic that pays homage to the golden era of motorcycling.",
          features: [
            "Retro styling",
            "Spoked wheels",
            "Round headlight and indicators"
          ],
          specifications: {
            "Engine": "650cc parallel-twin, air-cooled",
            "Power": "47 HP @ 7,000 rpm"
          },
          stock: 4,
          images: [
            "https://images.unsplash.com/photo-1558980394-dbb977039a2e?w=800&h=600&fit=crop"
          ],
          rating: 4.6,
          reviewCount: 29,
          isFeatured: true
        },
        quantity: 1
      }
    ],
    totalAmount: 12499,
    status: "pending",
    paymentMethod: "Bank Transfer",
    shippingAddress: {
      fullName: "John Doe",
      streetAddress: "123 Main St",
      city: "Anytown",
      state: "CA",
      postalCode: "12345",
      country: "USA",
      phone: "555-123-4567"
    },
    orderDate: "2023-04-18T09:15:00Z"
  }
];
