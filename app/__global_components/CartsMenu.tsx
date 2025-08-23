'use client';

import React, { useEffect, useRef, useState } from 'react';
import {
  Heart,
  User,
  X,
  LogOut,
  Settings,
  ShoppingBag,
  Bell,
} from 'lucide-react';
import { useCartStore } from '@/hook/persist'; // তোমার existing hook
import { toast } from 'sonner';
import Image from 'next/image';
import useWishStore from '@/hook/useWishStore';
import Link from 'next/link';

type NotificationItem = {
  id: string;
  title: string;
  body?: string;
  createdAt: string;
  read?: boolean;
  href?: string;
};

export default function CartsMenu() {
  const cartStore = useCartStore();
  const cartCount = cartStore.cart.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0
  );

  // ----- WISHLIST from Zustand -----
  const wishlist = useWishStore((s) => s.wishlist);
  const removeFromWish = useWishStore((s) => s.remove);
  const clearWish = useWishStore((s) => s.clear);
  const wishCount = wishlist.length;

  // dropdown states
  const [openCart, setOpenCart] = useState(false);
  const [openWish, setOpenWish] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  // notification state
  const [openNotif, setOpenNotif] = useState(false);
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 'n1',
      title: 'Order #1234 shipped',
      body: 'Your order is on the way. Track it from your orders page.',
      createdAt: new Date().toISOString(),
      read: false,
      href: '/orders/1234',
    },
    {
      id: 'n2',
      title: 'New discount on selected items',
      body: 'Up to 20% off on accessories this week.',
      createdAt: new Date().toISOString(),
      read: false,
      href: '/collections/accessories',
    },
    {
      id: 'n3',
      title: 'Payment canceled',
      body: 'Your recent payment has been canceled. Please try again.',
      createdAt: new Date().toISOString(),
      read: false,
      href: '/payments/history',
    },
    {
      id: 'n4',
      title: 'Successfully completed payment',
      body: 'Your payment was successful. Thank you for your purchase!',
      createdAt: new Date().toISOString(),
      read: false,
      href: '/orders/5678',
    },
    {
      id: 'n5',
      title: 'New message from support',
      body: 'Our support team has replied to your request.',
      createdAt: new Date().toISOString(),
      read: false,
      href: '/support/tickets/123',
    },
    {
      id: 'n6',
      title: 'Weekly newsletter',
      body: 'Check out the latest updates and offers this week.',
      createdAt: new Date().toISOString(),
      read: false,
      href: '/news',
    },
    {
      id: 'n7',
      title: 'Order #9876 delivered',
      body: 'Your order has been delivered successfully.',
      createdAt: new Date().toISOString(),
      read: false,
      href: '/orders/9876',
    },
    {
      id: 'n8',
      title: 'Stock alert: Item back in stock',
      body: 'The item you wanted is now available again.',
      createdAt: new Date().toISOString(),
      read: false,
      href: '/products/abc123',
    },
    {
      id: 'n9',
      title: 'Referral bonus earned',
      body: 'You earned a bonus for referring a friend!',
      createdAt: new Date().toISOString(),
      read: false,
      href: '/rewards',
    },
    {
      id: 'n10',
      title: 'Security alert: New login detected',
      body: 'A new login to your account was detected.',
      createdAt: new Date().toISOString(),
      read: false,
      href: '/account/security',
    },
  ]);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const cartRef = useRef<HTMLDivElement | null>(null);
  const wishRef = useRef<HTMLDivElement | null>(null);
  const userRef = useRef<HTMLDivElement | null>(null);
  const notifRef = useRef<HTMLDivElement | null>(null);

  // click outside handler
  useEffect(() => {
    function handler(e: MouseEvent) {
      const el = e.target as Node;
      if (cartRef.current && !cartRef.current.contains(el)) setOpenCart(false);
      if (wishRef.current && !wishRef.current.contains(el)) setOpenWish(false);
      if (userRef.current && !userRef.current.contains(el)) setOpenUser(false);
      if (notifRef.current && !notifRef.current.contains(el))
        setOpenNotif(false);
    }

    window.addEventListener('click', handler);
    return () => window.removeEventListener('click', handler);
  }, []);

  // keyboard: Esc closes everything
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenCart(false);
        setOpenWish(false);
        setOpenUser(false);
        setOpenNotif(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // wishlist handlers
  const handleRemoveFromWishlist = (id: string) => {
    removeFromWish(id);
    toast.success('Removed from wishlist');
  };

  const handleClearWishlist = () => {
    clearWish();
    toast.success('Wishlist cleared');
  };

  // notification handlers
  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const fakeUser = {
    name: 'Mazaharul Islam',
    avatar:
      'https://newmazaharul.vercel.app/_next/image?url=https%3A%2F%2Famimazaharul.vercel.app%2F_next%2Fimage%3Furl%3D%252Fmaza-original_processed1.jpg%26w%3D640%26q%3D75&w=256&q=75',
    email: 'you@flexin.com',
  };

  return (
    <div className="flex items-center gap-3">
      {/* === CART ICON & DROPDOWN === */}
      <div className="relative" ref={cartRef}>
        <button
          className="relative cursor-pointer p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          aria-haspopup="dialog"
          aria-expanded={openCart}
          onClick={() => {
            setOpenCart((v) => !v);
            setOpenWish(false);
            setOpenUser(false);
            setOpenNotif(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setOpenCart((v) => !v);
          }}
          title="Cart"
        >
          <ShoppingBag className="w-5 h-5 text-gray-700" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] px-1 text-[11px] font-semibold rounded-full bg-rose-500 text-white flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>

        {/* dropdown */}
        {openCart && (
          <div
            role="dialog"
            aria-label="Cart preview"
            className="absolute right-0 mt-2 w-72 bg-white border border-gray-100 shadow-2xl shadow-gray-300/80 rounded-xl -lg p-3 z-50 animate-slideDown"
          >
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-800">Cart</h4>
              <button
                className="p-1 rounded-md hover:bg-gray-100 cursor-pointer"
                onClick={() => setOpenCart(false)}
                aria-label="Close"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="mt-3">
              {cartStore.cart.length === 0 ? (
                <div className="text-sm text-gray-500">Your cart is empty.</div>
              ) : (
                <ul className="space-y-2 max-h-48 overflow-auto">
                  {cartStore.cart.map((it) => (
                    <li key={it.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-md bg-gray-100 overflow-hidden flex-shrink-0">
                        {it.imageUrl ? (
                          <Image
                            src={it.imageUrl}
                            alt={it.name}
                            width={25}
                            height={25}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-800 line-clamp-1">
                          {it.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {it.quantity} × €{it.price?.toFixed?.(0) ?? it.price}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <div className="text-sm font-semibold text-gray-800">
                Total: €
                {cartStore.cart
                  .reduce(
                    (s: number, i) => s + (i.price || 0) * (i.quantity || 1),
                    0
                  )
                  .toFixed(0)}
              </div>
              <div className="flex items-center gap-2">
                <button className="text-xs px-2 py-1 rounded-md hover:bg-gray-100 cursor-pointer">
                  <Link href={'/carts'}> View</Link>
                </button>
                <button
                  className="text-xs bg-rose-500 text-white px-3 py-1 rounded-sm hover:opacity-95 cursor-pointer"
                  onClick={() => {
                    setOpenCart(false);
                  }}
                >
                  <Link href={'/checkout'}> Checkout</Link>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* === WISHLIST ICON & DROPDOWN (Zustand) === */}
      <div className="relative hidden md:block" ref={wishRef}>
        <button
          className="relative p-2 cursor-pointer rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          aria-haspopup="menu"
          aria-expanded={openWish}
          onClick={() => {
            setOpenWish((v) => !v);
            setOpenCart(false);
            setOpenUser(false);
            setOpenNotif(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setOpenWish((v) => !v);
          }}
          title="Wishlist"
        >
          <Heart
            className={`w-5 h-5 ${
              wishCount ? 'text-rose-500' : 'text-gray-700'
            }`}
          />
          {wishCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] px-1 text-[11px] font-semibold rounded-full bg-rose-500 text-white flex items-center justify-center">
              {wishCount}
            </span>
          )}
        </button>

        {openWish && (
          <div className="absolute right-0 mt-2 w-72 bg-white border border-gray-100 shadow-2xl shadow-gray-300/80 rounded-xl  p-3 z-50 animate-slideDown">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-800">Wishlist</h4>
              <button
                className="p-1 rounded-md hover:bg-gray-100 cursor-pointer"
                onClick={() => setOpenWish(false)}
                aria-label="Close"
              >
                <X className="w-4 h-4 text-gray-500" />
              </button>
            </div>

            <div className="mt-3">
              {wishlist.length === 0 ? (
                <div className="text-sm text-gray-500">No items saved yet.</div>
              ) : (
                <ul className="space-y-2 max-h-48 overflow-auto">
                  {wishlist.map((item) => (
                    <li
                      key={item.id ?? item}
                      className="flex items-center justify-between"
                    >
                      <div className="text-sm text-gray-800">
                        <Link href={`/products/${item.slug}`}>{item.name}</Link>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="text-xs text-rose-600 hover:underline cursor-pointer"
                          onClick={() => {
                            handleRemoveFromWishlist(item.id ?? item);
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mt-3 flex justify-between items-center">
              <button
                className="text-xs text-gray-600 hover:underline cursor-pointer"
                onClick={() => {
                  setOpenWish(false);
                }}
              >
                View all
              </button>
              <button
                className="text-xs text-rose-500 cursor-pointer"
                onClick={() => handleClearWishlist()}
                disabled={wishlist.length === 0}
              >
                Clear
              </button>
            </div>
          </div>
        )}
      </div>

      {/* === NOTIFICATION ICON & DROPDOWN === */}
      <div className="relative " ref={notifRef}>
        <button
          className="relative p-2 cursor-pointer rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          aria-haspopup="menu"
          aria-expanded={openNotif}
          onClick={() => {
            setOpenNotif((v) => !v);
            setOpenCart(false);
            setOpenWish(false);
            setOpenUser(false);
            // optional: mark all read when opened
            // setNotifications(prev => prev.map(n => ({...n, read: true})));
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setOpenNotif((v) => !v);
          }}
          title="Notifications"
        >
          <Bell
            className={`w-5 h-5 ${
              unreadCount ? 'text-rose-500' : 'text-gray-700'
            }`}
          />
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[18px] px-1 text-[11px] font-semibold rounded-full bg-rose-500 text-white flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </button>

        {openNotif && (
          <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-100 shadow-2xl shadow-gray-300/80 rounded-xl p-3 z-50 animate-slideDown">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-gray-800">Notifications</h4>
              <div className="flex items-center gap-2">
                <button
                  className="text-xs px-2 py-1 rounded-md hover:bg-gray-100"
                  onClick={() => markAllRead()}
                >
                  Mark all read
                </button>
                <button
                  className="p-1 rounded-md hover:bg-gray-100 cursor-pointer"
                  onClick={() => setOpenNotif(false)}
                  aria-label="Close"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            <div className="mt-3">
              {notifications.length === 0 ? (
                <div className="text-sm text-gray-500">No notifications</div>
              ) : (
                <ul className="space-y-2 max-h-56 overflow-auto">
                  {notifications.map((n) => (
                    <li
                      key={n.id}
                      className={`flex items-start gap-3 p-2 rounded-md ${
                        n.read ? 'bg-white' : 'bg-amber-50/70'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-full bg-gray-100 grid place-items-center text-xs font-semibold text-gray-600">
                        {/* short icon / initials */}
                        🔔
                      </div>

                      <div className="flex-1  cursor-grab">
                        <div
                          onClick={() => {
                            markRead(n.id);
                          }}
                        >
                          <div className="text-sm font-medium text-gray-800 capitalize">
                            {n.title}
                          </div>
                          {n.body && (
                            <div className="text-xs text-gray-500 line-clamp-2">
                              {n.body}
                            </div>
                          )}
                        </div>
                        <div className="text-[11px] text-gray-400 mt-1">
                          {new Date(n.createdAt).toLocaleString()}
                        </div>
                      </div>

                      <div className="flex items-start">
                        {!n.read && (
                          <button
                            className="text-xs text-rose-600 ml-2"
                            onClick={() => {
                              markRead(n.id);
                            }}
                          >
                            Mark
                          </button>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {notifications.length > 0 && (
              <div className="mt-3 flex justify-between items-center">
                <button
                  className="text-xs text-gray-600 hover:underline"
                  onClick={() => {
                    setOpenNotif(false);
                  }}
                >
                  View all
                </button>
                <button
                  className="text-xs text-rose-500 cursor-pointer"
                  onClick={() => clearNotifications()}
                >
                  Clear
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* === USER ICON & DROPDOWN === */}
      <div className="relative" ref={userRef}>
        <button
          className="p-1 rounded-full cursor-pointer hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
          aria-haspopup="menu"
          aria-expanded={openUser}
          onClick={() => {
            setOpenUser((v) => !v);
            setOpenCart(false);
            setOpenWish(false);
            setOpenNotif(false);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setOpenUser((v) => !v);
          }}
          title="Account"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-purple-400">
            <Image
              src={fakeUser.avatar}
              alt={fakeUser.name}
              width={32}
              height={32}
              className="object-cover"
            />
          </div>
        </button>

        {openUser && (
          <div className="absolute right-0 mt-2 w-52 bg-white border border-gray-100 shadow-lg rounded-lg p-3 z-50 animate-slideDown">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-400">
                <Image
                  src={fakeUser.avatar}
                  alt={fakeUser.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-gray-800">
                  {fakeUser.name}
                </div>
                <div className="text-xs text-gray-500">{fakeUser.email}</div>
              </div>
            </div>

            <div className="mt-3 grid gap-2">
              <button
                className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 text-sm"
                onClick={() => {
                  setOpenUser(false);
                }}
              >
                <User className="w-4 h-4 text-gray-600" />
                Profile
              </button>

              <button
                className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 text-sm"
                onClick={() => {
                  setOpenUser(false);
                }}
              >
                <Settings className="w-4 h-4 text-gray-600" />
                Settings
              </button>

              <button
                className="flex cursor-pointer items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-50 text-sm text-rose-600"
                onClick={() => {
                  setOpenUser(false);
                }}
              >
                <LogOut className="w-4 h-4 text-rose-600" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {/* small animations CSS (put in global CSS or tailwind config as plugin) */}
      <style jsx>{`
        .animate-slideDown {
          animation: slideDown 160ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );
}
