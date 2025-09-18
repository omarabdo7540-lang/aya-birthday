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
          <Link href={`/gift?name=${name}`}><span className="px-4 py-2 bg-purple-600 text-white rounded cursor-pointer">Open Gift</span></Link>
          <Link href={`/heart?name=${name}`}><span className="px-4 py-2 border border-purple-600 text-purple-600 rounded cursor-pointer">See the Heart</span></Link>
        </div>
      </div>
    </Layout>
  )
}