import type { Product } from "@/types/product";

// Placeholder data until Milestone 8 wires this up to Supabase.
export const FEATURED_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Daily Multivitamin",
    description: "A complete daily multivitamin for adults.",
    category: "Vitamins",
    price: 14.99,
    stockQuantity: 120,
    imageUrl: null,
  },
  {
    id: "2",
    name: "Allergy Relief Tablets",
    description: "24-hour non-drowsy allergy relief.",
    category: "Over-the-Counter",
    price: 11.49,
    stockQuantity: 80,
    imageUrl: null,
  },
  {
    id: "3",
    name: "Digital Thermometer",
    description: "Fast, accurate readings in 10 seconds.",
    category: "Medical Devices",
    price: 19.99,
    stockQuantity: 45,
    imageUrl: null,
  },
  {
    id: "4",
    name: "Immune Support Gummies",
    description: "Vitamin C, D, and zinc in a daily gummy.",
    category: "Vitamins",
    price: 16.99,
    stockQuantity: 60,
    imageUrl: null,
  },
];