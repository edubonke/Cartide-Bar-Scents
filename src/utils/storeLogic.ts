import type { PerfumeProduct, ScentFamily } from '../data/catalog';

export interface CartItem {
  productId: string;
  variantId: string;
  name: string;
  variantLabel: string;
  unitPrice: number;
  quantity: number;
  image: string;
  imageAlt: string;
}

export interface CartSummary {
  itemCount: number;
  subtotal: number;
  shippingFee: number;
  freeShippingThreshold: number;
  remainingForFreeShipping: number;
  total: number;
}

export interface CheckoutFormInput {
  fullName: string;
  email: string;
  address: string;
  city: string;
}

export interface CheckoutValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof CheckoutFormInput, string>>;
}

export const FREE_SHIPPING_THRESHOLD = 700;
export const STANDARD_SHIPPING_FEE = 65;

export function formatRand(amount: number): string {
  const rounded = Math.round(amount);
  return `R${rounded.toLocaleString('en-US')}`;
}

export function filterProducts(
  products: PerfumeProduct[],
  family: 'All' | ScentFamily,
  searchQuery: string
): PerfumeProduct[] {
  const normalizedQuery = searchQuery.trim().toLowerCase();
  return products.filter((product) => {
    const matchesFamily = family === 'All' || product.scentFamily === family;
    if (!matchesFamily) return false;
    if (!normalizedQuery) return true;
    const haystack = [
      product.name,
      product.subtitle,
      product.scentFamily,
      product.notes.top,
      product.notes.heart,
      product.notes.base,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(normalizedQuery);
  });
}

export function addToCart(
  items: CartItem[],
  product: PerfumeProduct,
  variantId: string,
  quantity = 1
): CartItem[] {
  const variant = product.variants.find((v) => v.id === variantId) ?? product.variants[0];
  if (!variant || quantity <= 0) return items;

  const existingIndex = items.findIndex(
    (item) => item.productId === product.id && item.variantId === variant.id
  );

  if (existingIndex >= 0) {
    return items.map((item, idx) =>
      idx === existingIndex ? { ...item, quantity: item.quantity + quantity } : item
    );
  }

  return [
    ...items,
    {
      productId: product.id,
      variantId: variant.id,
      name: product.name,
      variantLabel: variant.label,
      unitPrice: variant.price,
      quantity,
      image: product.image,
      imageAlt: product.imageAlt,
    },
  ];
}

export function updateCartQuantity(
  items: CartItem[],
  productId: string,
  variantId: string,
  delta: number
): CartItem[] {
  return items
    .map((item) => {
      if (item.productId === productId && item.variantId === variantId) {
        return { ...item, quantity: item.quantity + delta };
      }
      return item;
    })
    .filter((item) => item.quantity > 0);
}

export function removeFromCart(
  items: CartItem[],
  productId: string,
  variantId: string
): CartItem[] {
  return items.filter(
    (item) => !(item.productId === productId && item.variantId === variantId)
  );
}

export function calculateCartSummary(items: CartItem[]): CartSummary {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const shippingFee =
    subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_FEE;
  const remainingForFreeShipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : FREE_SHIPPING_THRESHOLD - subtotal;

  return {
    itemCount,
    subtotal,
    shippingFee,
    freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
    remainingForFreeShipping,
    total: subtotal + shippingFee,
  };
}

export function validateCheckoutForm(form: CheckoutFormInput): CheckoutValidationResult {
  const errors: Partial<Record<keyof CheckoutFormInput, string>> = {};
  if (form.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name.';
  }
  const emailTrimmed = form.email.trim();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
    errors.email = 'Please enter a valid email address.';
  }
  if (form.address.trim().length < 5) {
    errors.address = 'Please enter a complete delivery street address.';
  }
  if (form.city.trim().length < 2) {
    errors.city = 'Please enter your city or town.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
