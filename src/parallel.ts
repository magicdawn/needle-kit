import { availableParallelism } from 'node:os'
import PQueue from 'p-queue'
import z from 'zod'

export function getConcurrency() {
  let concurrency = availableParallelism()

  if (process.env.UV_THREADPOOL_SIZE) {
    // try parse process.env.UV_THREADPOOL_SIZE
    const schema = z.coerce.number().min(concurrency)
    const parsed = schema.safeParse(process.env.UV_THREADPOOL_SIZE)
    if (parsed.success) {
      concurrency = parsed.data
    }
  }

  return concurrency
}

export function newPQueue() {
  return new PQueue({ concurrency: getConcurrency() })
}
