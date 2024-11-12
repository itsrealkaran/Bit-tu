'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, BookOpen, Menu, X, Zap, Users, Lightbulb } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useSDK } from '@metamask/sdk-react';
import * as Popover from "@radix-ui/react-popover";
import { ethers } from 'ethers';

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useContracts } from '@/hooks/useContracts';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { sdk, connected, connecting, account } = useSDK();
  const { checkUserExists, loginUser, loading: contractsLoading, userAuthContract } = useContracts();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [referralId, setReferralId] = useState('');
  const [registrationError, setRegistrationError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  // Add new state for user data
  const [userData, setUserData] = useState<{
    name: string;
    referralId: string;
    score: string;
  } | null>(null);

  // Effect to handle wallet connection status changes
  useEffect(() => {
    const checkUserStatus = async () => {
      if (connected && account) {
        console.log('Wallet connected, checking user status for account:', account);
        try {
          const exists = await checkUserExists();
          console.log('User exists check result:', exists);
          
          if (exists) {
            console.log('Existing user found, proceeding with login...');
            const userInfo = await loginUser();
            if (userInfo) {
              console.log('Login successful:', userInfo);
              setUserData(userInfo);
              // Close modal if it's open
              setIsModalOpen(false);
            }
          } else {
            console.log('New user detected, showing registration modal');
            setIsModalOpen(true);
          }
        } catch (err) {
          console.error('Error in checkUserStatus:', err);
          setRegistrationError('Failed to check user status. Please try again.');
        }
      } else {
        // Reset user data when disconnected
        setUserData(null);
      }
    };

    checkUserStatus();
  }, [connected, account]);

  const handleSubmitRegistration = async () => {
    console.log('Starting registration process...');
    setIsProcessing(true);
    setRegistrationError('');
    
    if (!userAuthContract || !account) {
      console.error('Missing required data:', { userAuthContract: !!userAuthContract, account });
      setRegistrationError('Contract or account not available. Please try reconnecting your wallet.');
      setIsProcessing(false);
      return;
    }
    
    try {
      await userAuthContract.createUser(
        name,
        referralId || ''
      );

      const gasLimit = estimatedGas.mul(120).div(100);

      const tx = await userAuthContract.createUser(
        name,
        referralId || '',
        {
          gasLimit: ethers.BigNumber.from(200000)
        }
      );

      console.log('Transaction sent:', tx.hash);
      await tx.wait();
      console.log('Transaction confirmed');
      
      setIsModalOpen(false);
      
      // After successful registration, login the user
      const userInfo = await loginUser();
      if (userInfo) {
        console.log('Login successful after registration:', userInfo);
        setUserData(userInfo);
      }
    } catch (error: any) {
      console.error('Registration failed with detailed error:', error);
      let errorMessage = 'Registration failed. Please try again later.';
      
      if (error.message.includes('user already exists')) {
        errorMessage = 'This wallet is already registered. Please try logging in instead.';
      } else if (error.message.includes('invalid referral')) {
        errorMessage = 'Invalid referral code. Please check and try again.';
      } else if (error.message.includes('insufficient funds')) {
        errorMessage = 'Insufficient funds to complete the transaction. Please check your wallet balance.';
      }
      
      setRegistrationError(errorMessage);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConnect = async () => {
    try {
      console.log('Initiating wallet connection...');
      await sdk?.connect();
      // User status will be checked by the useEffect hook
    } catch (err) {
      console.warn('Connection failed:', err);
    }
  };

  const disconnect = () => {
    console.log('Disconnecting wallet...');
    if (sdk) {
      sdk.terminate();
      setUserData(null); // Clear user data on disconnect
      console.log('Wallet disconnected');
    }
  };

  const formatAddress = (address: string | undefined) => {
    if (!address) return 'No Address';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Update the Popover content to show user info
  const renderWalletContent = () => (
    <Popover.Content className="mt-2 p-2 w-56 bg-white border border-blue-100 rounded-lg shadow-lg animate-in fade-in-50 zoom-in-95">
      <div className="space-y-2">
        <div className="px-2 py-1">
          <div className="text-sm font-medium text-gray-900">{userData?.name}</div>
          <div className="text-xs text-gray-500">{formatAddress(account)}</div>
          {userData?.score && (
            <div className="text-xs text-blue-600 mt-1">
              Score: {userData.score}
            </div>
          )}
        </div>
        <div className="h-px bg-gradient-to-r from-blue-100 to-transparent" />
        <button
          onClick={disconnect}
          className="w-full flex items-center gap-x-2 px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
        >
          <X className="h-4 w-4" />
          Disconnect
        </button>
      </div>
    </Popover.Content>
  );

  return (
    <>
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setIsModalOpen(false);
                handleConnect(); // Call wallet connect when modal is closed
              }
            }}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gradient-to-br from-orange-900 to-orange-800 rounded-xl p-8 w-full max-w-md shadow-2xl border border-orange-700/50"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-white mb-4">Complete Your Profile</h2>
              <p className="text-orange-200 mb-6">Please provide your details to complete registration</p>
              
              {registrationError && (
              {registrationError && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm">
                  {registrationError}
                </div>
              )}
              )}
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-orange-200 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-orange-950/50 border border-orange-700/50 rounded-lg text-white placeholder-orange-400/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter your name"
                    disabled={isProcessing}
                  />
                </div>
                <div>
                  <label htmlFor="referral" className="block text-sm font-medium text-blue-200 mb-2">
                  <label htmlFor="referral" className="block text-sm font-medium text-orange-200 mb-2">
                    Referral Code
                  </label>
                  <input
                    type="text"
                    id="referral"
                    value={referralId}
                    onChange={(e) => setReferralId(e.target.value)}
                    className="w-full px-4 py-2 bg-orange-950/50 border border-orange-700/50 rounded-lg text-white placeholder-orange-400/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                    placeholder="Optional referral code"
                    disabled={isProcessing}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-x-4 mt-8">
                <Button
                  onClick={() => {
                    setIsModalOpen(false);
                    handleConnect(); // Call wallet connect when modal is closed
                  }}
                  className="px-6 py-2 bg-orange-950/80 text-orange-200 hover:bg-orange-950 transition-colors duration-200"
                  disabled={isProcessing}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmitRegistration}
                  disabled={!name || isProcessing}
                  className="px-6 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  {isProcessing ? 'Processing...' : 'Complete Registration'}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.header 
        className="w-full bg-gradient-to-r from-orange-900 via-orange-700 to-orange-500 px-4 py-3"
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-orange-300 to-orange-100 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
              <Image src="/logo.png?height=40&width=40" alt="Web3 Lingo Logo" height={40} width={40} className="relative rounded-full" />
            </motion.div>

            <h1 className="text-2xl font-bold text-white">
              bit <span className="text-orange-200">tu</span>
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
                <Link href={href} className="text-orange-100 hover:text-white transition-colors group">
                  <div className="flex items-center gap-x-1">
                    <Icon className="h-4 w-4" />
                    <span>{label}</span>
                  </div>
                  <motion.div 
                    className="h-0.5 bg-orange-300"
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
                <Popover.Root>
                  <Popover.Trigger asChild>
                    <Button className="hidden md:flex items-center gap-x-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white hover:from-blue-800 hover:to-blue-600 transition-all duration-300">
                    <Button 
                      className="hidden md:flex items-center gap-x-2 bg-gradient-to-r from-orange-900 to-orange-700 text-white hover:from-orange-800 hover:to-orange-600 transition-all duration-300"
                    >
                      <Wallet className="h-4 w-4" />
                      {userData?.name || formatAddress(account)}
                    </Button>
                  </Popover.Trigger>
                  {renderWalletContent()}
                  <Popover.Content className="mt-2 p-2 w-48 bg-white border border-orange-100 rounded-lg shadow-lg animate-in fade-in-50 zoom-in-95">
                    <div className="space-y-2">
                      <div className="px-2 py-1 text-sm text-gray-500">
                        Connected Wallet
                      </div>
                      <div className="h-px bg-gradient-to-r from-orange-100 to-transparent" />
                      <button
                        onClick={disconnect}
                        className="w-full flex items-center gap-x-2 px-2 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors duration-200"
                      >
                        <X className="h-4 w-4" />
                        Disconnect
                      </button>
                    </div>
                  </Popover.Content>
                </Popover.Root>
              ) : (
                <Button 
                  className="hidden md:flex items-center gap-x-2 border-orange-400 hover:bg-orange-700 hover:text-white transition-colors duration-300"
                  onClick={handleConnect}
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
                <Button className="hidden md:flex items-center gap-x-2 bg-orange-100 text-orange-900 hover:bg-white hover:text-orange-700 transition-colors duration-300">
                  <Zap className="h-4 w-4" />
                  Start Learning
                </Button>
              </Link>
            </motion.div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden text-white hover:bg-orange-700/50" onClick={() => setIsMenuOpen(!isMenuOpen)}>
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
              <DropdownMenuContent align="end" className="w-56 bg-orange-800 text-orange-100 border-orange-700">
                {[
                  { href: '/courses', label: 'Courses', icon: BookOpen },
                  { href: '/community', label: 'Community', icon: Users },
                  { href: '/resources', label: 'Resources', icon: Lightbulb },
                  { href: '/lang-selection', label: 'Start Learning', icon: Zap },
                ].map(({ href, label, icon: Icon }) => (
                  <DropdownMenuItem key={href} className="hover:bg-orange-700 focus:bg-orange-700">
                    <Link href={href} className="flex w-full items-center gap-x-2">
                      <Icon className="h-4 w-4" />
                      {label}
                    </Link>
                  </DropdownMenuItem>
                ))}
                <DropdownMenuItem className="hover:bg-orange-700 focus:bg-orange-700">
                  {connected && account ? (
                    <div className="w-full space-y-2">
                      <div className="flex items-center gap-x-2">
                        <Wallet className="h-4 w-4" />
                        {formatAddress(account)}
                      </div>
                      <div className="h-px bg-gradient-to-r from-orange-100 to-transparent" />
                      <button 
                        onClick={disconnect}
                        className="w-full flex items-center gap-x-2 text-red-500 hover:text-red-600 transition-colors"
                      >
                        <X className="h-4 w-4" />
                        Disconnect
                      </button>
                    </div>
                  ) : (
                    <button 
                      className="flex w-full items-center gap-x-2"
                      onClick={handleConnect}
                      disabled={connecting}
                    >
                      <Wallet className="h-4 w-4" />
                      {connecting ? 'Connecting...' : 'Connect Wallet'}
                    </button>
                  )}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.header>
    </>
  )
}

export default Header