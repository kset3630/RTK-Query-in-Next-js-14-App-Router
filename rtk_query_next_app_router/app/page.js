"use client";

import { useGetClashQuery } from "@/redux/slice/api";


export default function Home() {
  const { data } = useGetClashQuery('')
  console.log('Data are',data)
  if (!data) {
    return <div>Loading...</div>;
  }
  return (
    <main>
      <div className="bg-gray-900 min-h-screen p-6">
        <div className="max-w-3xl mx-auto bg-gray-900  rounded-lg shadow-md p-6">
          <h1 className="text-neutral-300 font-bold text-4xl flex justify-center">
            RtK Query
          </h1>

          <div className="grid grid-cols-2 gap-4 mt-6 border-2 border-gray-700 m-2 p-2">
            {data.resources.map((resource) => (
              <div key={resource.id} className="p-4 bg-gray-800 rounded shadow-md">
                <h2 className="text-lg font-semibold">{resource.category}</h2>
                <p className="text-gray-500">{resource.title}</p>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}