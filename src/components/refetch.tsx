import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { Button } from './ui/button'


function useUuid() {
  return useQuery({
    queryKey: ['uuid'],
    queryFn: async () => {
      const response = await fetch(`https://uuid.rocks/json`)

      if (!response.ok) {
        throw new Error('fetch failed')
      }

      return response.json()
    },
    refetchInterval: 5000
  })
}

const RefetchIntervel = () => {
 const { data, status, fetchStatus, refetch } = useUuid();

 if (status === "pending") {
   return <div>...</div>;
 }

 if (status === "error") {
   return <div>Error fetching UUID</div>;
 }

 return (
   <div className='flex flex-col items-center justify-center'>
     <div className='text-2xl text-center tracking-tight font-bold '>{data.uuid}</div>
     <Button className='mt-8' onClick={() => refetch()}>Refetch</Button>
     <span>{fetchStatus === "fetching" ? "updating..." : null}</span>
   </div>
 );
}

export default RefetchIntervel