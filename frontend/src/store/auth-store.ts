"use client";

import { create } from "zustand";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  dormId?: string;
  roomNumber?: string | null;
}

interface AuthSession {
  accessToken: string;
  refreshToken?: string;
}

interface AuthState {
  user: AuthUser | null;
  session: AuthSession | null;
  setSession: (payload: { user: AuthUser; session: AuthSession }) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  setSession: ({ user, session }) => set({ user, session }),
  logout: () => set({ user: null, session: null }),
}));

