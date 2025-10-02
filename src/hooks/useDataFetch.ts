import { useState, useCallback, useRef, useEffect } from 'react';
import { getListReport, IReqestBody, IResGetList } from '@/actions/request';
import { dataCache, generateCacheKey } from '@/utils/dataCache';

interface UseDataFetchOptions {
  autoRefresh?: boolean;
  refreshInterval?: number; // in milliseconds
  onError?: (error: Error) => void;
  onSuccess?: (data: IResGetList) => void;
  cacheKey?: string;
  cacheTTL?: number; // Time to live in milliseconds
  useCache?: boolean;
}

interface UseDataFetchReturn<T> {
  data: T | null;
  isLoading: boolean;
  isRefreshing: boolean;
  error: Error | null;
  refresh: () => Promise<void>;
  lastUpdated: Date | null;
}

export function useDataFetch<T = IResGetList>(
  fetchFunction: () => Promise<T>,
  options: UseDataFetchOptions = {}
): UseDataFetchReturn<T> {
  const {
    autoRefresh = false,
    refreshInterval = 30000, // 30 seconds default
    onError,
    onSuccess,
    cacheKey,
    cacheTTL = 5 * 60 * 1000, // 5 minutes default
    useCache = true,
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isMountedRef = useRef(true);

  const fetchData = useCallback(async (isRefresh = false) => {
    const key = cacheKey || 'default';
    
    // Check cache first if not refreshing and cache is enabled
    if (!isRefresh && useCache) {
      const cachedData = dataCache.get<T>(key);
      if (cachedData) {
        setData(cachedData);
        setLastUpdated(new Date());
        return;
      }
    }

    if (isRefresh) {
      setIsRefreshing(true);
    } else {
      setIsLoading(true);
    }
    setError(null);

    try {
      const result = await fetchFunction();
      
      if (isMountedRef.current) {
        setData(result);
        setLastUpdated(new Date());
        
        // Cache the result if caching is enabled
        if (useCache) {
          dataCache.set(key, result, cacheTTL);
        }
        
        onSuccess?.(result as IResGetList);
      }
    } catch (err) {
      if (isMountedRef.current) {
        const error = err instanceof Error ? err : new Error('Unknown error occurred');
        setError(error);
        onError?.(error);
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  }, [fetchFunction, onError, onSuccess, cacheKey, cacheTTL, useCache]);

  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  // Initial fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Auto refresh setup
  useEffect(() => {
    if (autoRefresh && refreshInterval > 0) {
      intervalRef.current = setInterval(() => {
        fetchData(true);
      }, refreshInterval);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [autoRefresh, refreshInterval, fetchData]);

  // Cleanup
  useEffect(() => {
    return () => {
      isMountedRef.current = false;
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    data,
    isLoading,
    isRefreshing,
    error,
    refresh,
    lastUpdated,
  };
}

// Specialized hook for report data
export function useReportData(
  requestParams: IReqestBody['input'],
  options: UseDataFetchOptions = {}
) {
  const fetchFunction = useCallback(() => {
    return getListReport({ input: requestParams });
  }, [requestParams]);

  // Generate cache key based on request parameters
  const cacheKey = useCallback(() => {
    return generateCacheKey('report', requestParams);
  }, [requestParams]);

  return useDataFetch(fetchFunction, {
    ...options,
    cacheKey: cacheKey(),
  });
}
