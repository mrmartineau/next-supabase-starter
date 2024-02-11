'use client';

import { ReactNode, createContext, useCallback, useContext } from 'react';

import { useRealtimeProfile } from '../hooks/useRealtime';
import { UserProfile } from '../types/db';
import { createBrowserClient } from '../utils/supabase/client';

export type UseUpdateReturn = (action: UIStateAction) => void;
export type UIStateAction =
  | { type: 'settings_something_visible'; payload: boolean }
  | { type: 'settings_something_else_visible'; payload: boolean };

interface UserContextType {
  profile: UserProfile | null;
  id: string | undefined;
  handleUpdateUISettings: UseUpdateReturn;
}

const UserContext = createContext<UserContextType | null>(null);

export const useUser = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('useUser has to be used within <UserContext.Provider>');
  }

  return userContext;
};

interface UserProviderProps extends Pick<UserContextType, 'profile' | 'id'> {
  children: ReactNode;
}

export const UserProvider = ({ children, id, profile }: UserProviderProps) => {
  const realtimeProfile = useRealtimeProfile(profile);
  const supabaseClient = createBrowserClient();

  const handleUpdateUISettings = useCallback(
    async (action: UIStateAction) => {
      let column = action.type;
      let value = action.payload;

      await supabaseClient
        .from('profiles')
        .update({ [column]: value, updated_at: new Date().toISOString() })
        .match({ id });
    },
    [id, supabaseClient],
  );

  return (
    <UserContext.Provider
      value={{
        id,
        profile: realtimeProfile,
        handleUpdateUISettings,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
