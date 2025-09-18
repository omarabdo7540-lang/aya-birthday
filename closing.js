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