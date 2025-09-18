# Happy Birthday AYA — Next.js (Enhanced Version)

This project now includes **all requested features**:
- 🎶 Background music (plays when clicking a button for better browser compatibility).
- ❤️ Full-screen animated heart background.
- 🎈 Balloons and cake images.
- 📝 User can enter a custom name to personalize the greeting.

---

## package.json (same as before, plus `howler` for music)
```json
{
  "name": "happy-birthday-aya",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.3.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "framer-motion": "10.12.5",
    "canvas-confetti": "1.6.0",
    "howler": "2.2.4"
  },
  "devDependencies": {
    "autoprefixer": "10.4.14",
    "postcss": "8.4.23",
    "tailwindcss": "3.4.7"
  }
}
```

---

## components/HeartBackground.js
```jsx
import { motion } from 'framer-motion'

export default function HeartBackground() {
  const hearts = Array.from({ length: 15 })
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {hearts.map((_, i) => (
        <motion.div
          key={i}
          className="absolute text-red-500 text-5xl"
          style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%` }}
          animate={{ y: [0, -50], opacity: [0, 1, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: i * 0.5 }}
        >
          ❤
        </motion.div>
      ))}
    </div>
  )
}
```

---

## components/MusicButton.js
```jsx
import { Howl } from 'howler'
import { useState } from 'react'

const sound = new Howl({
  src: ['/music.mp3'], // place your birthday music in public/music.mp3
  loop: true,
  volume: 0.5,
})

export default function MusicButton() {
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    if (playing) {
      sound.pause()
    } else {
      sound.play()
    }
    setPlaying(!playing)
  }

  return (
    <button
      onClick={toggle}
      className="fixed bottom-6 right-6 bg-pink-600 text-white px-4 py-2 rounded-full shadow-lg"
    >
      {playing ? '🔇 Stop Music' : '🎶 Play Music'}
    </button>
  )
}
```

---

## components/Layout.js (updated to include hearts + music button)
```jsx
import HeartBackground from './HeartBackground'
import MusicButton from './MusicButton'

export default function Layout({ children }) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-300 via-purple-300 to-yellow-200 p-6">
      <HeartBackground />
      <div className="w-full max-w-3xl bg-white/70 backdrop-blur rounded-2xl shadow-xl p-6 z-10">{children}</div>
      <MusicButton />
    </div>
  )
}
```

---

## pages/index.js (Intro with name form)
```jsx
import { useState } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function Home() {
  const [name, setName] = useState('Aya')
  const router = useRouter()

  const handleStart = () => {
    router.push(`/wish?name=${encodeURIComponent(name)}`)
  }

  return (
    <Layout>
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">🎉 Welcome! 🎉</h1>
        <p className="mb-6">Today is a very special day — let's celebrate {name}!</p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="px-4 py-2 border rounded mb-4"
          placeholder="Enter name"
        />

        <div>
          <button onClick={handleStart} className="px-6 py-3 bg-pink-600 text-white rounded-lg shadow">Start Celebration</button>
        </div>
      </div>
    </Layout>
  )
}
```

---

## pages/wish.js (uses name)
```jsx
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '../components/Layout'

export default function Wish() {
  const router = useRouter()
  const name = router.query.name || 'Aya'

  return (
    <Layout>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-3">Happy Birthday, {name}! 🎂🎈</h2>
        <p className="mb-6">Wishing you love, joy, health, and endless happiness.</p>

        <div className="flex justify-center gap-4">
          <Link href={`/gift?name=${name}`}><a className="px-4 py-2 bg-purple-600 text-white rounded">Open Gift</a></Link>
          <Link href={`/heart?name=${name}`}><a className="px-4 py-2 border border-purple-600 text-purple-600 rounded">See the Heart</a></Link>
        </div>
      </div>
    </Layout>
  )
}
```

---

## pages/gift.js (balloons + cake images)
```jsx
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import Link from 'next/link'
import confetti from 'canvas-confetti'

export default function Gift() {
  const router = useRouter()
  const name = router.query.name || 'Aya'

  useEffect(() => {
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } })
  }, [])

  return (
    <Layout>
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Click the Gift to Open 🎁</h2>
        <p className="mb-6">Surprise, {name}! May your day be filled with smiles and magic ✨</p>

        <img src="/cake.png" alt="Cake" className="mx-auto w-40 mb-6" />
        <img src="/balloons.png" alt="Balloons" className="mx-auto w-48 mb-6" />

        <div className="flex justify-center">
          <button onClick={() => confetti({ particleCount: 300, spread: 120, scalar: 1.2 })} className="px-6 py-3 bg-rose-500 text-white rounded-2xl shadow-lg">Open Your Gift</button>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <Link href={`/heart?name=${name}`}><a className="px-4 py-2 border rounded">Go to Heart</a></Link>
          <Link href={`/closing?name=${name}`}><a className="px-4 py-2 bg-green-600 text-white rounded">Finish</a></Link>
        </div>
      </div>
    </Layout>
  )
}
```

---

## pages/heart.js (AYA <<33 + custom name)
```jsx
import { useRouter } from 'next/router'
import Layout from '../components/Layout'
import { motion } from 'framer-motion'

export default function Heart() {
  const router = useRouter()
  const name = router.query.name || 'Aya'

  return (
    <Layout>
      <motion.div initial={{scale:0.8, opacity:0}} animate={{scale:1, opacity:1}} transition={{duration:0.7}} className="text-center">
        <div className="text-6xl md:text-7xl font-extrabold mb-4">❤️ AYA &lt;&lt;33 ❤️</div>
        <p className="text-xl mb-6">Happy Birthday, {name}! You are truly loved 💕</p>

        <div className="flex justify-center gap-4">
          <a href={`/gift?name=${name}`} className="px-4 py-2 border rounded">Back to Gift</a>
          <a href={`/closing?name=${name}`} className="px-4 py-2 bg-pink-600 text-white rounded">Finish</a>
        </div>
      </motion.div>
    </Layout>
  )
}
```

---

## pages/closing.js (Closing)
```jsx
import { useRouter } from 'next/router'
import Layout from '../components/Layout'

export default function Closing(){
  const router = useRouter()
  const name = router.query.name || 'Aya'

  return (
    <Layout>
      <div className="text-center">
        <h3 className="text-2xl font-bold mb-4">Thank you for being you 💖</h3>
        <p className="mb-6">{name}, have the happiest birthday ever! 🎉</p>
        <div className="flex justify-center gap-4">
          <a href="/" className="px-4 py-2 border rounded">Back Home</a>
        </div>
      </div>
    </Layout>
  )
}
```

---

## Assets to add in `/public`
- `music.mp3` → background birthday song.
- `cake.png` → cake image.
- `balloons.png` → balloons image.

---

## Usage
1. Place assets in `/public`.
2. Run `npm install`, then `npm run dev`.
3. Deploy to Vercel.
4. Share links like: `https://yourapp.vercel.app/?name=Aya`.

---
