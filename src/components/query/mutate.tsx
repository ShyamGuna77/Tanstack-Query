

"use client";

import { useMutation } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
export default function AddNameForm() {
  const mutation = useMutation({
    mutationFn: async (name: string) => {
     
      await new Promise((res) => setTimeout(res, 1000));

      // try to read value from event after 1 second
    
      console.log("Saved name:", name);
      return name;
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const name = e.currentTarget.nameInput.value;
    mutation.mutate(name);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto flex justify-center min-h-screen items-center    gap-4" >
      <Input name="nameInput" placeholder="Enter a name" required className="w-full" />
      <Button type="submit">Add</Button>
      {mutation.isError && (
        <div className="text-red-500">{mutation.error.message}</div>
      )}
      {mutation.isSuccess && (
        <div className="text-green-500">Name added successfully</div>
          )}
          {mutation.isPending && (
            <div className="text-yellow-500">Adding name...</div>
          )}
          <br />
          <p>{mutation.data}</p>
    </form>
  );
}
