// Fallback implementation when Redis is not available
export const redis = {
  get: async () => null,
  set: async () => null,
  hget: async () => null,
  hset: async () => null,
  incr: async () => 1,
  zadd: async () => null,
  zrange: async () => [],
  del: async () => null,
}

export const kv = redis
