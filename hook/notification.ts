'use client';
import { v4 as uuidv4 } from 'uuid';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Notification {
  id?: string;
  title: string;
  body: string;
  createdAt?: string;
  read: boolean;
  href?: string;
}

interface NotificationState {
  notifications: Notification[];
  setNotification: (notification: Notification) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotification: () => void;
}

export const useNotificationStore = create(
  persist<NotificationState>(
    (set) => ({
      notifications: [],

   setNotification: (notification) =>
  set((state) => {
    const newNotification = {
      id: uuidv4(), // random unique id
      title: notification.title,
      body: notification.body,
      href: notification.href ?? '/',
      createdAt: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      read: false,
    };

    return {
      notifications: [newNotification, ...state.notifications],
    };
  }),

      markAsRead: (id) =>
        set((state) => ({
          notifications: state.notifications.map((n) =>
            n.id === id ? { ...n, read: true } : n
          ),
        })),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
        })),

      clearNotification: () =>
        set(() => ({
          notifications: [],
        })),
    }),
    {
      name: 'notification-storage', // localStorage key
    }
  )
);
