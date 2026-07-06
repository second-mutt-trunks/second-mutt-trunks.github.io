
(function() {
  const originalRefreshMap = window.refreshMap;
  if (typeof originalRefreshMap === 'function') {
    window.refreshMap = function() {
      // Call the original function first
      originalRefreshMap.apply(this, arguments);
      
      // Now add our custom logic
      try {
        // We need access to timeBuckets, state, records. 
        // If they are in the closure of refreshMap, we might need a different approach.
        // Let's assume they are accessible or try to find them.
        
        // Re-calculating counts based on the 'visible' logic found earlier
        const dynamicCounts = {};
        
        // Collect all indices for the selected range (same logic as refreshMap)
        let allIndices = [];
        for (let i = state.timeIndex; i <= state.timeIndexEnd; i++) {
          allIndices = allIndices.concat(timeBuckets[i][1]);
        }

        allIndices.forEach(idx => {
          const r = records[idx];
          dynamicCounts[r.catId] = (dynamicCounts[r.catId] || 0) + 1;
        });

        document.querySelectorAll('.cat-item').forEach(el => {
          const cid = el.dataset.catId;
          const countEl = el.querySelector('.cat-count');
          if (countEl) {
            countEl.textContent = (dynamicCounts[cid] || 0).toLocaleString();
          }
        });
      } catch (e) {
        console.error("Dynamic update failed:", e);
      }
    };
    // Trigger once
    window.refreshMap();
  }
})();
