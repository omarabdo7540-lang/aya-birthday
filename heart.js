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