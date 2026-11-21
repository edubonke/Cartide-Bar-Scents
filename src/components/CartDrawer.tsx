import { useEffect, useState, type FormEvent } from 'react';
import { Minus, Plus, Trash2, X, Check } from 'lucide-react';
import type { CartItem, CheckoutFormInput } from '../utils/storeLogic';
import {
  calculateCartSummary,
  formatRand,
  validateCheckoutForm,
} from '../utils/storeLogic';
import { ResilientImage } from './ResilientImage';

interface CartDrawerProps {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onUpdateQuantity: (productId: string, variantId: string, delta: number) => void;
  onRemoveItem: (productId: string, variantId: string) => void;
  onClearCart: () => void;
  onBrowseShop: () => void;
}

type DrawerStep = 'bag' | 'checkout' | 'confirmed';

export function CartDrawer({
  open,
  items,
  onClose,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onBrowseShop,
}: CartDrawerProps) {
  const [step, setStep] = useState<DrawerStep>('bag');
  const [form, setForm] = useState<CheckoutFormInput>({
    fullName: '',
    email: '',
    address: '',
    city: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormInput, string>>>({});
  const [orderRef, setOrderRef] = useState('');
  const [confirmedTotal, setConfirmedTotal] = useState(0);

  const summary = calculateCartSummary(items);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    return () => { document.documentElement.style.overflow = previousOverflow; };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open && items.length > 0 && step === 'confirmed') {
      setStep('bag');
    }
  }, [open, items.length, step]);

  if (!open) return null;

  const progressRatio = Math.min(100, (summary.subtotal / summary.freeShippingThreshold) * 100);

  const handleCheckoutSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validation = validateCheckoutForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    setConfirmedTotal(summary.total);
    setOrderRef(`CBS-${Math.floor(1040 + (summary.total % 8900))}`);
    onClearCart();
    setStep('confirmed');
  };

  const handleCloseAndReset = () => {
    if (step === 'confirmed') {
      setStep('bag');
      setForm({ fullName: '', email: '', address: '', city: '' });
    }
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end h-dvh max-w-full bg-[#161412]/40 backdrop-blur-[2px]"
      role="presentation"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleCloseAndReset();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Shopping bag"
        className="w-full max-w-md min-w-0 h-full min-h-0 bg-[#F6F4EF] text-[#161412] border-l border-[#161412]/12 flex flex-col shadow-2xl"
      >
        {/* Top Header */}
        <div className="px-4 sm:px-6 py-4 sm:py-5 shrink-0 border-b border-[#161412]/10 flex items-center justify-between gap-2">
          <div>
            <h2 className="font-display text-2xl font-medium tracking-tight">
              {step === 'bag' && 'Your Bag'}
              {step === 'checkout' && 'Atelier Dispatch'}
              {step === 'confirmed' && 'Demo Order Complete'}
            </h2>
            {step === 'bag' && (
              <p className="text-xs text-[#5A554E] mt-0.5 tabular-nums">
                {summary.itemCount} {summary.itemCount === 1 ? 'object' : 'objects'} selected
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleCloseAndReset}
            aria-label="Close shopping bag"
            className="w-11 h-11 shrink-0 inline-flex items-center justify-center text-[#5A554E] hover:text-[#161412] transition-colors cursor-pointer"
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 min-h-0 min-w-0 overflow-y-auto overscroll-contain px-4 sm:px-6 py-6">
          {step === 'confirmed' ? (
            <div className="py-10 space-y-6">
              <div className="w-11 h-11 flex items-center justify-center border border-[#8C6A43] text-[#8C6A43]">
                <Check size={20} strokeWidth={1.75} />
              </div>
              <div className="space-y-2">
                <p className="text-xs tracking-widest uppercase text-[#8C6A43] font-semibold tabular-nums">
                  Demo reference {orderRef}
                </p>
                <h3 className="font-display text-3xl font-medium leading-tight">
                  Your checkout preview is complete.
                </h3>
                <p className="text-sm text-[#5A554E] leading-relaxed">
                  Thank you, {form.fullName}. This is a demonstration only. No payment was collected, order placed, or receipt or tracking email sent.
                </p>
              </div>
              <div className="border-t border-b border-[#161412]/10 py-4 space-y-2 text-sm">
                <div className="flex justify-between gap-3">
                  <span className="text-[#5A554E]">Destination</span>
                  <span className="min-w-0 [overflow-wrap:anywhere] text-right font-medium">
                    {form.address}, {form.city}
                  </span>
                </div>
                <div className="flex justify-between tabular-nums">
                  <span className="text-[#5A554E]">Demo Total</span>
                  <span className="font-semibold">{formatRand(confirmedTotal)}</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleCloseAndReset();
                  onBrowseShop();
                }}
                className="w-full py-3.5 px-6 text-xs font-semibold tracking-widest uppercase bg-[#161412] text-[#F6F4EF] hover:bg-[#8C6A43] transition-colors cursor-pointer"
              >
                Continue Exploring
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="h-full flex flex-col items-start justify-center py-12 space-y-5">
              <p className="font-display text-3xl text-[#161412]">Your bag is quiet.</p>
              <p className="text-sm text-[#5A554E] leading-relaxed">
                Explore our small-batch solid perfume bars—hand-poured in brushed brass vessels
                starting at R370.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onBrowseShop();
                }}
                className="px-6 py-3 text-xs font-semibold tracking-widest uppercase bg-[#161412] text-[#F6F4EF] hover:bg-[#8C6A43] transition-colors cursor-pointer"
              >
                Explore Collection
              </button>
            </div>
          ) : step === 'bag' ? (
            <div className="space-y-6">
              {/* Complimentary Courier Progress */}
              <div className="pb-5 border-b border-[#161412]/10 space-y-2">
                <p className="text-xs text-[#5A554E] tabular-nums">
                  {summary.remainingForFreeShipping > 0
                    ? `Add ${formatRand(summary.remainingForFreeShipping)} more for complimentary courier delivery.`
                    : 'Complimentary South African courier delivery unlocked.'}
                </p>
                <div className="h-[2px] w-full bg-[#161412]/10 overflow-hidden">
                  <div
                    className="h-full bg-[#8C6A43] transition-transform duration-300 origin-left"
                    style={{ transform: `scaleX(${progressRatio / 100})` }}
                  />
                </div>
              </div>

              {/* Line Items */}
              <ul className="divide-y divide-[#161412]/10">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.variantId}`}
                    className="py-5 first:pt-0 flex gap-3 sm:gap-4"
                  >
                    <ResilientImage
                      src={item.image}
                      alt={item.imageAlt}
                      containerClassName="w-16 h-20 sm:w-20 sm:h-24 shrink-0"
                      className="w-full h-full object-cover"
                      fallbackTitle={item.name}
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-display text-lg font-medium leading-snug text-[#161412]">
                            {item.name}
                          </h3>
                          <p className="text-xs text-[#5A554E] mt-0.5">{item.variantLabel}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => onRemoveItem(item.productId, item.variantId)}
                          aria-label={`Remove ${item.name} (${item.variantLabel})`}
                          className="w-11 h-11 shrink-0 inline-flex items-center justify-center text-[#5A554E] hover:text-[#161412] transition-colors cursor-pointer"
                        >
                          <Trash2 size={15} strokeWidth={1.5} />
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-3">
                        <div className="inline-flex items-center border border-[#161412]/15">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.productId, item.variantId, -1)}
                            aria-label={`Decrease quantity of ${item.name}`}
                            className="w-11 h-11 inline-flex items-center justify-center text-[#161412] hover:bg-[#EDE9E0] transition-colors cursor-pointer"
                          >
                            <Minus size={13} strokeWidth={1.5} />
                          </button>
                          <span className="w-8 text-center text-xs font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.productId, item.variantId, 1)}
                            aria-label={`Increase quantity of ${item.name}`}
                            className="w-11 h-11 inline-flex items-center justify-center text-[#161412] hover:bg-[#EDE9E0] transition-colors cursor-pointer"
                          >
                            <Plus size={13} strokeWidth={1.5} />
                          </button>
                        </div>

                        <p className="text-sm font-medium tabular-nums">
                          {formatRand(item.unitPrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <form id="checkout-form" onSubmit={handleCheckoutSubmit} noValidate className="space-y-5">
              <p className="text-sm text-[#5A554E] leading-relaxed">
                Demo checkout only. Use sample details; no information is submitted and no payment or real order is processed.
              </p>

              <div className="space-y-1.5">
                <label htmlFor="checkout-name" className="block text-xs font-semibold uppercase tracking-wider text-[#5A554E]">
                  Full Name
                </label>
                <input
                  id="checkout-name"
                  type="text"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Thabo Mokoena"
                  className="w-full px-3.5 py-2.5 text-sm bg-white/70 border border-[#161412]/20 focus:border-[#8C6A43] focus:outline-none"
                />
                {errors.fullName && (
                  <p className="text-xs text-[#9B2C2C]">{errors.fullName}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="checkout-email" className="block text-xs font-semibold uppercase tracking-wider text-[#5A554E]">
                  Email Address
                </label>
                <input
                  id="checkout-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="name@domain.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-white/70 border border-[#161412]/20 focus:border-[#8C6A43] focus:outline-none"
                />
                {errors.email && <p className="text-xs text-[#9B2C2C]">{errors.email}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="checkout-address" className="block text-xs font-semibold uppercase tracking-wider text-[#5A554E]">
                  Street Address
                </label>
                <input
                  id="checkout-address"
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
                  placeholder="42 Jan Smuts Avenue, Rosebank"
                  className="w-full px-3.5 py-2.5 text-sm bg-white/70 border border-[#161412]/20 focus:border-[#8C6A43] focus:outline-none"
                />
                {errors.address && <p className="text-xs text-[#9B2C2C]">{errors.address}</p>}
              </div>

              <div className="space-y-1.5">
                <label htmlFor="checkout-city" className="block text-xs font-semibold uppercase tracking-wider text-[#5A554E]">
                  City
                </label>
                <input
                  id="checkout-city"
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  placeholder="Johannesburg"
                  className="w-full px-3.5 py-2.5 text-sm bg-white/70 border border-[#161412]/20 focus:border-[#8C6A43] focus:outline-none"
                />
                {errors.city && <p className="text-xs text-[#9B2C2C]">{errors.city}</p>}
              </div>
            </form>
          )}
        </div>

        {/* Footer Totals & Actions */}
        {items.length > 0 && step !== 'confirmed' && (
          <div className="shrink-0 min-w-0 px-4 sm:px-6 py-4 sm:py-5 border-t border-[#161412]/10 bg-[#EDE9E0]/60 space-y-4">
            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-[#5A554E] tabular-nums">
                <span>Subtotal</span>
                <span>{formatRand(summary.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#5A554E] tabular-nums">
                <span>Courier Delivery</span>
                <span>{summary.shippingFee === 0 ? 'Complimentary' : formatRand(summary.shippingFee)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#161412]/10 font-semibold text-base tabular-nums">
                <span>Total</span>
                <span>{formatRand(summary.total)}</span>
              </div>
            </div>

            {step === 'bag' ? (
              <button
                type="button"
                onClick={() => setStep('checkout')}
                className="w-full py-3.5 px-6 text-xs font-semibold tracking-widest uppercase bg-[#161412] text-[#F6F4EF] hover:bg-[#8C6A43] transition-colors cursor-pointer"
              >
                Proceed to Checkout
              </button>
            ) : (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('bag')}
                  className="px-5 py-3.5 text-xs font-semibold tracking-widest uppercase border border-[#161412]/20 text-[#161412] hover:bg-[#EDE9E0] transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  form="checkout-form"
                  className="flex-1 min-w-0 py-3.5 px-3 sm:px-6 text-xs font-semibold tracking-widest uppercase bg-[#161412] text-[#F6F4EF] hover:bg-[#8C6A43] transition-colors cursor-pointer"
                >
                  Preview Order · {formatRand(summary.total)}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
