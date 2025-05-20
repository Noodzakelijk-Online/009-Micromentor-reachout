/**
 * Resource Optimization Utilities
 * 
 * This module provides utilities and techniques to optimize resource usage
 * in the Mentor Messenger Magic application, making it as efficient as possible.
 */

// Memoization cache for expensive function calls
const memoizationCache = new Map();

// Resource optimization utilities
const resourceOptimizer = {
  /**
   * Memoize a function to avoid redundant calculations
   * @param {Function} fn - Function to memoize
   * @param {Function} keyFn - Function to generate cache key (optional)
   * @returns {Function} Memoized function
   */
  memoize(fn, keyFn = (...args) => JSON.stringify(args)) {
    return (...args) => {
      const key = keyFn(...args);
      if (memoizationCache.has(key)) {
        return memoizationCache.get(key);
      }
      const result = fn(...args);
      memoizationCache.set(key, result);
      return result;
    };
  },

  /**
   * Clear the memoization cache or a specific entry
   * @param {string} key - Specific cache key to clear (optional)
   */
  clearMemoizationCache(key = null) {
    if (key === null) {
      memoizationCache.clear();
    } else if (memoizationCache.has(key)) {
      memoizationCache.delete(key);
    }
  },

  /**
   * Debounce a function to reduce frequent calls
   * @param {Function} fn - Function to debounce
   * @param {number} delay - Delay in milliseconds
   * @returns {Function} Debounced function
   */
  debounce(fn, delay) {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => fn(...args), delay);
    };
  },

  /**
   * Throttle a function to limit call frequency
   * @param {Function} fn - Function to throttle
   * @param {number} limit - Minimum time between calls in milliseconds
   * @returns {Function} Throttled function
   */
  throttle(fn, limit) {
    let lastCall = 0;
    return (...args) => {
      const now = Date.now();
      if (now - lastCall >= limit) {
        lastCall = now;
        return fn(...args);
      }
    };
  },

  /**
   * Lazy load a component or resource
   * @param {Function} importFn - Import function that returns a promise
   * @returns {Promise} Promise that resolves to the imported module
   */
  lazyLoad(importFn) {
    return React.lazy(importFn);
  },

  /**
   * Optimize images by reducing quality and size
   * @param {File|Blob} imageFile - Image file to optimize
   * @param {Object} options - Optimization options
   * @returns {Promise<Blob>} Optimized image blob
   */
  async optimizeImage(imageFile, options = {}) {
    const { maxWidth = 1200, maxHeight = 1200, quality = 0.8 } = options;
    
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        // Create canvas and draw resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob with reduced quality
        canvas.toBlob(
          (blob) => resolve(blob),
          imageFile.type,
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(imageFile);
    });
  },

  /**
   * Batch multiple API requests into a single request
   * @param {Array} requests - Array of request objects
   * @returns {Promise} Promise that resolves to array of responses
   */
  batchRequests(requests) {
    // Implementation would depend on your API structure
    // This is a simplified example
    return fetch('/api/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ requests }),
    }).then(res => res.json());
  },

  /**
   * Implement virtual scrolling for large lists
   * @param {Array} items - Full list of items
   * @param {number} visibleItems - Number of items visible at once
   * @returns {Object} Virtual scrolling controller
   */
  virtualScroll(items, visibleItems = 10) {
    return {
      totalItems: items.length,
      getVisibleItems: (startIndex) => {
        return items.slice(startIndex, startIndex + visibleItems);
      }
    };
  },

  /**
   * Compress data before sending to reduce bandwidth
   * @param {Object|string} data - Data to compress
   * @returns {string} Compressed data string
   */
  compressData(data) {
    // In a real implementation, this would use a compression algorithm
    // For this demo, we'll use a simple JSON stringify
    const jsonString = typeof data === 'string' ? data : JSON.stringify(data);
    
    // In a real implementation, you would use something like:
    // return LZString.compressToUTF16(jsonString);
    
    return jsonString;
  },

  /**
   * Decompress data received from server
   * @param {string} compressedData - Compressed data string
   * @returns {Object|string} Original data
   */
  decompressData(compressedData) {
    // In a real implementation, this would use a decompression algorithm
    // For this demo, we'll use a simple JSON parse if possible
    
    // In a real implementation, you would use something like:
    // const decompressed = LZString.decompressFromUTF16(compressedData);
    
    try {
      return JSON.parse(compressedData);
    } catch (e) {
      return compressedData;
    }
  },

  /**
   * Implement progressive loading for large data sets
   * @param {Function} loadFn - Function to load data chunks
   * @param {number} chunkSize - Size of each chunk
   * @returns {Object} Progressive loading controller
   */
  progressiveLoad(loadFn, chunkSize = 50) {
    let currentPage = 0;
    let isLoading = false;
    let hasMore = true;
    
    return {
      loadNextChunk: async () => {
        if (isLoading || !hasMore) return null;
        
        isLoading = true;
        try {
          const result = await loadFn(currentPage, chunkSize);
          currentPage++;
          
          if (!result || result.length < chunkSize) {
            hasMore = false;
          }
          
          return result;
        } finally {
          isLoading = false;
        }
      },
      reset: () => {
        currentPage = 0;
        isLoading = false;
        hasMore = true;
      },
      hasMore: () => hasMore,
      isLoading: () => isLoading
    };
  },

  /**
   * Optimize React component rendering
   * @param {Object} component - React component to optimize
   * @returns {Object} Optimized component
   */
  optimizeComponent(component) {
    // This is a simplified example
    // In a real implementation, you would use React.memo, useMemo, useCallback, etc.
    return React.memo(component);
  },

  /**
   * Implement resource-efficient data caching
   * @param {number} maxSize - Maximum cache size
   * @returns {Object} Cache controller
   */
  createCache(maxSize = 100) {
    const cache = new Map();
    const keyTimestamps = new Map();
    
    return {
      get: (key) => {
        if (cache.has(key)) {
          keyTimestamps.set(key, Date.now());
          return cache.get(key);
        }
        return undefined;
      },
      set: (key, value) => {
        if (cache.size >= maxSize) {
          // Evict least recently used item
          let oldestKey = null;
          let oldestTime = Infinity;
          
          for (const [k, time] of keyTimestamps.entries()) {
            if (time < oldestTime) {
              oldestTime = time;
              oldestKey = k;
            }
          }
          
          if (oldestKey) {
            cache.delete(oldestKey);
            keyTimestamps.delete(oldestKey);
          }
        }
        
        cache.set(key, value);
        keyTimestamps.set(key, Date.now());
      },
      has: (key) => cache.has(key),
      delete: (key) => {
        cache.delete(key);
        keyTimestamps.delete(key);
      },
      clear: () => {
        cache.clear();
        keyTimestamps.clear();
      },
      size: () => cache.size
    };
  }
};

export default resourceOptimizer;
