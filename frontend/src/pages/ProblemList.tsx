import React, { useEffect, useState } from 'react';

interface Problem {
    id: string;
    name: string;
    category: string;
    difficulty: string;
    description: string;
  }

function ProblemList(){
    const [problems, setProblems] = useState<Problem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('http://localhost:8000/problem/problemList');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProblems(data.problemList);
          } catch (error) {
            setError(error instanceof Error ? error.message : 'An unknown error occurred');
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []); // Empty dependency array means this runs once on mount
    
      // Display loading, error, or the fetched data
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error}</div>;

    return(
        <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Fetched Problems</h2>
      <div className="space-y-4">
        {problems.map((problem) => (
          <div key={problem.id} className="p-4 border rounded-md shadow-md bg-white">
            <h3 className="font-semibold text-lg">{problem.category}</h3>
            <p>{problem.description}</p>
            <p>{problem.difficulty}</p>
          </div>
        ))}
      </div>
    </div>
    )
}

export default ProblemList;