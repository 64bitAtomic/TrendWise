'use client';

import { useSession, signIn, signOut } from 'next-auth/react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { data: session, status } = useSession();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <nav className="bg-gray-900 text-white px-4 py-3">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
        {/* Left: Brand + mobile theme toggle */}
        <div className="flex justify-between items-center w-full sm:w-auto">
          <h1 className="text-xl font-bold">TrendWise</h1>
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="sm:hidden bg-gray-700 hover:bg-gray-600 px-2 py-1 text-sm rounded"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>

        {/* Right: Theme toggle + auth controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 gap-2">
          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="hidden sm:inline bg-gray-700 hover:bg-gray-600 px-2 py-1 text-sm rounded w-full sm:w-auto"
          >
            {theme === 'dark' ? '🌞 Light' : '🌙 Dark'}
          </button>

          {status === 'loading' ? (
            <p className="text-sm text-center">Loading...</p>
          ) : session ? (
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-1 text-sm">
              <p className="text-center sm:text-left">
                Hello, {session.user.name || session.user.email}
              </p>
              <button
                onClick={() => signOut()}
                className="bg-red-600 px-3 py-1 rounded hover:bg-red-500 text-sm w-full sm:w-auto"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => signIn('google')}
              className="bg-blue-600 px-3 py-1 rounded hover:bg-blue-500 text-sm w-full sm:w-auto"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

