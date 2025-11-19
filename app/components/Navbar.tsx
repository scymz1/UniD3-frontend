'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, HelpCircle, Mail, MessageSquare } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/chat', label: 'Chatbot', icon: MessageSquare },
    { href: '/help', label: 'Help', icon: HelpCircle },
    { href: '/contact', label: 'Contact', icon: Mail },
  ];

  return (
    <nav className="bg-gradient-to-r from-amber-900 via-orange-700 to-amber-900 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 shadow-lg border-b border-amber-600/30 dark:border-stone-600/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="text-2xl font-bold text-white group-hover:text-amber-200 transition-colors">
              UniD<sup className="text-lg">3</sup>
            </div>
            <span className="hidden sm:inline text-sm text-amber-100 font-medium">
              Chatbot
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? 'bg-white/20 text-white shadow-md backdrop-blur-sm border border-white/30'
                        : 'text-amber-100 hover:bg-white/10 hover:text-white'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
}

