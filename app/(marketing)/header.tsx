'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, BookOpen, Menu, X, Zap, Users, Lightbulb } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSDK } from '@metamask/sdk-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@radix-ui/react-popover";

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { sdk, connected, connecting, account } = useSDK();

  const connect = async () => {
    try {
      await sdk?.connect();
    } catch (err) {
      console.warn(`No accounts found`, err);
    }
  };

  const disconnect = () => {
    if (sdk) {
      sdk.terminate();
    }
  };

  const formatAddress = (address: string | undefined) => {
    if (!address) return 'No Address';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <motion.header 
      className="w-full bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 px-4 py-3"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto flex items-center justify-between max-w-7xl">
        <Link href="/" className="flex items-center gap-x-2 group">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-300 to-blue-100 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
            <Image src="/logo.png?height=40&width=40" alt="Web3 Lingo Logo" height={40} width={40} className="relative rounded-full" />
          </motion.div>

          <h1 className="text-2xl font-bold text-white">
            Edu <span className="text-blue-200">Lingo</span>
          </h1>
        </Link>

        <nav className="hidden md:flex items-center gap-x-6">
          {[
            { href: '/courses', label: 'Courses', icon: BookOpen },
            { href: '/community', label: 'Community', icon: Users },
            { href: '/resources', label: 'Resources', icon: Lightbulb },
          ].map(({ href, label, icon: Icon }) => (
            <motion.div
              key={href}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <Link href={href} className="text-blue-100 hover:text-white transition-colors group">
                <div className="flex items-center gap-x-1">
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </div>
                <motion.div 
                  className="h-0.5 bg-blue-300"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3 }}
                ></motion.div>
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="flex items-center gap-x-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {connected && account ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="hidden md:flex items-center gap-x-2 border-blue-400 hover:bg-blue-700 hover:text-white transition-colors duration-300">
                    {formatAddress(account)}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="mt-2 w-44 bg-gray-100 border rounded-md shadow-lg right-0 z-10">
                  <button
                    onClick={disconnect}
                    className="block w-full pl-2 pr-4 py-2 text-left text-[#F05252] hover:bg-gray-200"
                  >
                    Disconnect
                  </button>
                </PopoverContent>
              </Popover>
            ) : (
              <Button 
                className="hidden md:flex items-center gap-x-2 border-blue-400 hover:bg-blue-700 hover:text-white transition-colors duration-300"
                onClick={connect}
                disabled={connecting}
              >
                <Wallet className="h-4 w-4" />
                {connecting ? 'Connecting...' : 'Connect Wallet'}
              </Button>
            )}
          </motion.div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/lang-selection">
              <Button className="hidden md:flex items-center gap-x-2 bg-blue-100 text-blue-900 hover:bg-white hover:text-blue-700 transition-colors duration-300">
                <Zap className="h-4 w-4" />
                Start Learning
              </Button>
            </Link>
          </motion.div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-blue-700/50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                <AnimatePresence mode="wait" initial={false}>
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ opacity: 0, rotate: -90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: 90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ opacity: 0, rotate: 90 }}
                      animate={{ opacity: 1, rotate: 0 }}
                      exit={{ opacity: 0, rotate: -90 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-blue-800 text-blue-100 border-blue-700">
              {[
                { href: '/courses', label: 'Courses', icon: BookOpen },
                { href: '/community', label: 'Community', icon: Users },
                { href: '/resources', label: 'Resources', icon: Lightbulb },
                { href: '/lang-selection', label: 'Start Learning', icon: Zap },
              ].map(({ href, label, icon: Icon }) => (
                <DropdownMenuItem key={href} className="hover:bg-blue-700 focus:bg-blue-700">
                  <Link href={href} className="flex w-full items-center gap-x-2">
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuItem className="hover:bg-blue-700 focus:bg-blue-700">
                <button 
                  className="flex w-full items-center gap-x-2"
                  onClick={connect}
                  disabled={connecting}
                >
                  <Wallet className="h-4 w-4" />
                  {connecting ? 'Connecting...' : 'Connect Wallet'}
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </motion.header>
  )
}

export default Header