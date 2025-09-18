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
          <button 
            onClick={() => confetti({ particleCount: 300, spread: 120, scalar: 1.2 })} 
            className="px-6 py-3 bg-rose-500 text-white rounded-2xl shadow-lg"
          >
            Open Your Gift
          </button>
        </div>
        <div className="mt-6 flex justify-center gap-4">
          <Link href={`/heart?name=${name}`}><span className="px-4 py-2 border rounded cursor-pointer">Go to Heart</span></Link>
          <Link href={`/closing?name=${name}`}><span className="px-4 py-2 bg-green-600 text-white rounded cursor-pointer">Finish</span></Link>
        </div>
      </div>
    </Layout>
  )
}