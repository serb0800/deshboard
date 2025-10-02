# Data Fetching System

This document describes the data fetching system implemented for the dashboard application.

## Features

### 1. Custom Data Fetching Hook (`useDataFetch`)

A powerful React hook that provides:
- **Automatic data fetching** with loading states
- **Auto-refresh functionality** with configurable intervals
- **Error handling** with custom error callbacks
- **Data caching** with TTL (Time To Live) support
- **Manual refresh** capability
- **Last updated timestamp** tracking

### 2. Specialized Report Data Hook (`useReportData`)

A specialized hook for report data that:
- Automatically generates cache keys based on request parameters
- Integrates with the existing `getListReport` API
- Provides the same features as `useDataFetch`

### 3. Data Caching System (`dataCache`)

A robust caching system that includes:
- **In-memory storage** with Map-based implementation
- **TTL support** for automatic expiration
- **Pattern-based invalidation** for bulk cache clearing
- **Automatic cleanup** of expired entries
- **Cache statistics** and monitoring

## Usage Examples

### Basic Data Fetching

```typescript
import { useDataFetch } from '@/hooks/useDataFetch';

function MyComponent() {
  const { data, isLoading, error, refresh, lastUpdated } = useDataFetch(
    () => fetchMyData(),
    {
      autoRefresh: true,
      refreshInterval: 30000, // 30 seconds
      cacheTTL: 5 * 60 * 1000, // 5 minutes
    }
  );

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      {data && <div>Data: {JSON.stringify(data)}</div>}
      <button onClick={refresh}>Refresh</button>
      {lastUpdated && <div>Last updated: {lastUpdated.toLocaleTimeString()}</div>}
    </div>
  );
}
```

### Report Data with Caching

```typescript
import { useReportData } from '@/hooks/useDataFetch';

function ReportComponent() {
  const { data, isLoading, isRefreshing, refresh } = useReportData(
    {
      filter: { country: ['US'], isTest: false },
      groupBy: ['day', 'country'],
      offset: 0,
      limit: 50,
      sortBy: 'Date',
      sortOrder: 'descend',
    },
    {
      autoRefresh: true,
      refreshInterval: 60000, // 1 minute
      cacheTTL: 2 * 60 * 1000, // 2 minutes
    }
  );

  return (
    <div>
      {isLoading && <div>Loading...</div>}
      {isRefreshing && <div>Refreshing...</div>}
      {data && <div>Total items: {data.total}</div>}
      <button onClick={refresh} disabled={isRefreshing}>
        Refresh Data
      </button>
    </div>
  );
}
```

### Manual Cache Management

```typescript
import { dataCache, generateCacheKey } from '@/utils/dataCache';

// Set data in cache
dataCache.set('my-key', myData, 5 * 60 * 1000); // 5 minutes TTL

// Get data from cache
const cachedData = dataCache.get('my-key');

// Check if data exists in cache
const exists = dataCache.has('my-key');

// Delete specific cache entry
dataCache.delete('my-key');

// Clear all cache
dataCache.clear();

// Invalidate cache entries matching a pattern
dataCache.invalidatePattern('report:*');

// Get cache statistics
const stats = dataCache.getStats();
console.log(`Cache size: ${stats.size}, Keys: ${stats.keys}`);
```

## Dashboard Integration

The dashboard now includes:

1. **Refresh Button**: Manual data refresh with loading indicator
2. **Auto-refresh Toggle**: Enable/disable automatic data updates
3. **Refresh Interval Selector**: Choose from 10 seconds to 10 minutes
4. **Last Updated Display**: Shows when data was last refreshed
5. **Loading States**: Visual feedback during data operations

## Configuration Options

### useDataFetch Options

- `autoRefresh`: Enable automatic data refresh (default: false)
- `refreshInterval`: Interval between auto-refreshes in milliseconds (default: 30000)
- `onError`: Callback function for error handling
- `onSuccess`: Callback function for successful data fetch
- `cacheKey`: Custom cache key (auto-generated if not provided)
- `cacheTTL`: Cache time-to-live in milliseconds (default: 300000)
- `useCache`: Enable/disable caching (default: true)

### Cache Configuration

- **Default TTL**: 5 minutes
- **Auto-cleanup**: Every 10 minutes
- **Pattern matching**: Supports regex patterns for bulk operations

## Performance Benefits

1. **Reduced API calls**: Caching prevents unnecessary requests
2. **Faster loading**: Cached data loads instantly
3. **Better UX**: Loading states and refresh indicators
4. **Automatic updates**: Keep data fresh without manual intervention
5. **Memory efficient**: Automatic cleanup of expired entries

## Error Handling

The system provides comprehensive error handling:
- Network errors are caught and displayed
- Failed requests don't break the UI
- Error callbacks allow custom error handling
- Retry mechanisms can be implemented using the refresh function

## Best Practices

1. **Use appropriate TTL**: Set cache TTL based on data freshness requirements
2. **Handle loading states**: Always show loading indicators for better UX
3. **Implement error handling**: Use error callbacks to handle failures gracefully
4. **Choose refresh intervals wisely**: Balance between data freshness and performance
5. **Monitor cache usage**: Use cache statistics to optimize performance
