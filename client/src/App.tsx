
import { Button } from '@/components/ui/button';
import { trpc } from '@/utils/trpc';
import { useState, useEffect, useCallback } from 'react';
import type { Greeting } from '../../server/src/schema';

function App() {
  const [greeting, setGreeting] = useState<Greeting | null>(null);

  const loadGreeting = useCallback(async () => {
    try {
      const result = await trpc.getGreeting.query();
      setGreeting(result);
    } catch (error) {
      console.error('Failed to load greeting:', error);
    }
  }, []);

  useEffect(() => {
    loadGreeting();
  }, [loadGreeting]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Button 
        className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 text-lg font-medium"
        variant="default"
      >
        {greeting?.message || 'hello'}
      </Button>
    </div>
  );
}

export default App;
