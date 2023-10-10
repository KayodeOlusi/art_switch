import { LRUCache } from "lru-cache";

const useCache = () => {
  const cache = new LRUCache({
    max: 25,
    allowStale: true,
    ttl: 1000 * 60 * 10,
  });

  const getCache = (key: string) => cache.get(key);
  const setCache = (key: string, value: any) => cache.set(key, value);

  return { cache, getCache, setCache };
};

export default useCache;
