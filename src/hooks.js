import { useState } from 'react';
import { getPapers } from './store';

// Returns [papers, refresh]. Call refresh() after changing data.
export function usePapers() {
  const [papers, setPapers] = useState(getPapers);
  return [papers, () => setPapers(getPapers())];
}
