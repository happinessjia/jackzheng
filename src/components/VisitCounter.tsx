'use client'

import { useEffect, useState } from 'react'

export default function VisitCounter() {
  const [count, setCount] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://api.countapi.xyz/hit/wubennao.com/visits')
      .then(res => res.json())
      .then(data => {
        setCount(data.value)
        setLoading(false)
      })
      .catch(() => {
        setLoading(false)
      })
  }, [])

  return (
    <div className="fixed right-4 bottom-4 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg px-4 py-3 text-center border border-gray-200">
      <div className="text-xs text-gray-500 mb-1">浏览量</div>
      {loading ? (
        <div className="w-12 h-6 bg-gray-200 animate-pulse rounded mx-auto" />
      ) : (
        <div className="text-2xl font-bold text-gray-800">{count?.toLocaleString() ?? '-'}</div>
      )}
    </div>
  )
}
