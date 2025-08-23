'use client';

import React, { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Minus, Plus, Trash, X } from 'lucide-react';
import { toast } from 'sonner';
import { useCartStore } from '@/hook/persist'; // adjust path
import { Button } from '@/components/ui/button';
import { addToCartitems } from '@/types/product';
import { appConfig } from '@/constant/app.config';

export default function CartItems() {
  const cartStore = useCartStore();

  // assume these methods exist on your store (adjust names if different)
  const cart = cartStore.cart;
  const increment = cartStore.increment;
  const decrement = cartStore.decrement;
  const remove = cartStore.removeFromCart;

  // remove confirmation
  const [confirmRemoveId, setConfirmRemoveId] = useState<string | null>(null);
  const confirmButtonRef = useRef<HTMLButtonElement | null>(null);

  // currency formatter
  const fmt = useMemo(
    () =>
      new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }),
    []
  );

  const subtotal = useMemo(
    () => cart.reduce((s, it) => s + (it.price || 0) * (it.quantity || 0), 0),
    [cart]
  );
  const shippingEstimate = subtotal > appConfig.carts.FEES_MIN_AMOUNT ? 0 : 5; // example rule
  const total = Math.max(0, subtotal + shippingEstimate);

  function handleIncrement(it: addToCartitems) {
    if (!increment) return;
    if (it.stock !== undefined && it.quantity >= it.stock) {
      toast.warning(`Only ${it.stock} in stock`);
      return;
    }
    increment(it.id);
  }

  function handleDecrement(it: addToCartitems) {
    if (!decrement) return;

    decrement(it.id);
  }

  function handleRemove(id: string) {
    setConfirmRemoveId(id);
    // focus confirm button when modal opens
    setTimeout(() => confirmButtonRef.current?.focus(), 50);
  }

  function confirmRemove() {
    if (!confirmRemoveId) return;
    if (!remove) return;
    remove(confirmRemoveId);
    toast.success('Removed from cart');
    setConfirmRemoveId(null);
  }

  function cancelRemove() {
    setConfirmRemoveId(null);
  }

  // Empty state
  if (cart.length === 0) {
    return (
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center p-10">
          <div className="text-6xl mb-4">🛒</div>
          <h1 className="text-2xl font-semibold mb-2">Your cart is empty</h1>
          <p className="text-sm text-gray-600 mb-6">
            Looks like you haven&apos;t added anything to your cart yet.
          </p>
          <Link href="/products">
            <Button className="cursor-pointer">Continue shopping</Button>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Items list */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">Your Cart</h1>
            <div className="text-sm text-gray-600">
              {cart.length} item{cart.length > 1 ? 's' : ''}
            </div>
          </div>

          <div className="space-y-3">
            {cart.map((it) => (
              <article
                key={it.id}
                className="flex gap-4 items-start border  border-gray-100 cursor-pointer rounded-lg p-3 hover:shadow-2xl hover:shadow-gray-100/60 transition"
              >
                <div className="w-24 h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                  {it.imageUrl ? (
                    <Image
                      src={it.imageUrl}
                      alt={it.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <Link
                    href={`/products/${it.slug ?? it.id}`}
                    className="block"
                  >
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                      {it.name}
                    </h3>
                  </Link>

                  <div className="mt-2 flex items-center gap-3 text-xs text-gray-500 flex-wrap">
                    {it.color && (
                      <span className="inline-flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded"
                          style={{ background: it.color }}
                          aria-hidden
                        />
                        <span className="capitalize">{it.color}</span>
                      </span>
                    )}
                    {it.size && <span className="uppercase">{it.size}</span>}
                    <span>{fmt.format(it.price)}</span>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center mt-4  ">
                    <div className=" flex items-center gap-1">
                      <button
                        aria-label={`Decrease quantity of ${it.name}`}
                        onClick={() => handleDecrement(it)}
                        className="p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                        disabled={it.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>

                      <div className="w-12 text-center font-medium">
                        {it.quantity}
                      </div>

                      <button
                        aria-label={`Increase quantity of ${it.name}`}
                        onClick={() => handleIncrement(it)}
                        className="p-2 border border-gray-200 rounded-md cursor-pointer hover:bg-gray-50"
                        disabled={
                          typeof it.stock === 'number' &&
                          it.quantity >= it.stock
                        }
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="float-end">
                      <button
                        aria-label={`Remove ${it.name}`}
                        onClick={() => handleRemove(it.id)}
                        className="ml-3 text-rose-600 hover:underline text-sm flex items-center gap-1 cursor-pointer"
                      >
                        <Trash size={14} /> Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="text-sm font-semibold">
                    {fmt.format(it.price * it.quantity)}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Summary */}
        <aside className="rounded-lg shadow-xl shadow-gray-50 border border-gray-100 p-5  h-fit">
          <div className="mb-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-600">Subtotal</div>
              <div className="text-sm font-medium">{fmt.format(subtotal)}</div>
            </div>

            <div className="flex items-center justify-between mt-2 text-sm text-gray-600">
              <div>Shipping</div>
              <div>
                {shippingEstimate === 0 ? 'Free' : fmt.format(shippingEstimate)}
              </div>
            </div>

            <div className="border-t border-gray-200/60 mt-3 pt-3 flex items-center justify-between">
              <div className="text-sm font-semibold">Total</div>
              <div className="text-xl font-bold">{fmt.format(total)}</div>
            </div>
          </div>

          <div>
            <Link
              href="/checkout"
              className="block  w-full text-center text-md py-2 rounded-md"
            >
              <Button variant={'default'} className="w-full cursor-pointer ">
                {' '}
                Checkout
              </Button>
            </Link>
            <Link
              href="/products"
              className="block   w-full text-center text-md py-2 rounded-md"
            >
              <Button
                variant={'secondary'}
                className="w-full cursor-pointer hover:bg-gray-50"
              >
                {' '}
                Continue shopping
              </Button>
            </Link>
          </div>

          <div className="text-xs text-center text-gray-500 mt-4">
            Secure checkout • Customer support
          </div>
        </aside>
      </div>

      {/* Remove confirmation modal */}
      {confirmRemoveId && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 grid place-items-center bg-black/40 p-4"
          onClick={cancelRemove}
        >
          <div
            className="bg-white rounded-lg max-w-sm w-full p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">Remove item</h3>
              <button
                className="p-1 cursor-pointer"
                onClick={cancelRemove}
                aria-label="Close"
              >
                <X />
              </button>
            </div>

            <p className="text-sm text-gray-600 mt-3">
              Are you sure you want to remove this item from your cart?
            </p>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={cancelRemove}
                className="px-3 py-1 rounded-md border cursor-pointer"
              >
                Cancel
              </button>
              <Button
                ref={confirmButtonRef}
                onClick={confirmRemove}
                className="cursor-pointer"
                variant={'destructive'}
              >
                Remove
              </Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
