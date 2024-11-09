'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, Globe, Search, Loader } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

interface Language {
  name: string
  flag: string
  popular: boolean
  price: number
}

const languages: Language[] = [
  { name: 'Spanish', flag: '🇪🇸', popular: true, price: 50 },
  { name: 'French', flag: '🇫🇷', popular: true, price: 50 },
  { name: 'German', flag: '🇩🇪', popular: true, price: 50 },
  { name: 'Italian', flag: '🇮🇹', popular: false, price: 50 },
  { name: 'Chinese', flag: '🇨🇳', popular: true, price: 50 },
  { name: 'Japanese', flag: '🇯🇵', popular: true, price: 50 },
  { name: 'Korean', flag: '🇰🇷', popular: false, price: 50 },
  { name: 'Russian', flag: '🇷🇺', popular: false, price: 50 },
  { name: 'Portuguese', flag: '🇵🇹', popular: false, price: 50 },
  { name: 'Arabic', flag: '🇸🇦', popular: false, price: 50 },
]

export default function LanguageSelectionPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null)
  const router = useRouter()

  const filteredLanguages = languages.filter(lang =>
    lang.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleLanguageSelect = (lang: Language) => {
    setSelectedLanguage(lang)
    setLoading(true)
    // Simulate API call or loading process
    setTimeout(() => {
      // router.push(`/learn/${lang.name.toLowerCase()}`)
      router.push(`/learn`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="mx-auto max-w-4xl px-4 py-12">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-blue-600">Choose Your Language</h1>
          <p className="text-lg text-gray-600">What language do you want to learn today?</p>
        </div>

        <div className="mb-8 relative">
          <Input
            type="text"
            placeholder="Search for a language"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredLanguages.map((lang, index) => (
            <motion.div
              key={lang.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <button 
                    onClick={() => handleLanguageSelect(lang)} 
                    className="w-full flex items-center justify-between p-4 hover:bg-blue-50 transition-colors"
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-medium text-gray-700">{lang.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-semibold text-blue-600">{lang.price} AURA</span>
                      <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                  </button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredLanguages.length === 0 && (
          <div className="mt-8 text-center text-gray-500">
            <Globe className="mx-auto h-12 w-12 text-gray-400" />
            <p className="mt-2">No languages found. Try a different search term.</p>
          </div>
        )}

        <div className="mt-12 text-center">
          <p className="mb-4 text-sm text-gray-500">Don't see your language? We're always adding more!</p>
          <Button className="text-blue-600 border-blue-300 hover:bg-blue-50">
            Request a Language
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <Loader className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-lg font-semibold text-gray-700">Loading {selectedLanguage?.name}...</p>
              <p className="text-sm text-gray-500 mt-2">Preparing your learning journey</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}