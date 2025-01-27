import { connectToDatabase } from '@/lib/mongodb'
import Main from '@/app/components/main'
import { notFound } from 'next/navigation'

export default async function SharedFieldPage({ params }: { params: { id: string } }) {
  const { db } = await connectToDatabase()
  const setup = await db.collection('fieldSetups').findOne({ id: params.id })

  if (!setup) {
    notFound()
  }

  return <Main initialData={setup} devMode={false} />
} 