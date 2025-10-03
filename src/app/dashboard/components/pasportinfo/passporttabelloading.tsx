import { Skeleton } from "@/components/ui/skeleton";

function PassportTabelLoading() {
  return (
    <div className="mt-14">
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-left font-bold text-sm">
                <Skeleton className="h-4 w-4" />
              </th>
              <th scope="col" className="px-6 py-3 text-left font-bold text-sm">
                <Skeleton className="h-4 w-32" />
              </th>
              <th scope="col" className="px-6 py-3 text-left font-bold text-sm">
                <Skeleton className="h-4 w-16" />
              </th>
              <th scope="col" className="px-6 py-3 text-left font-bold text-sm">
                <Skeleton className="h-4 w-24" />
              </th>
              <th scope="col" className="px-6 py-3 text-left font-bold text-sm">
                <Skeleton className="h-4 w-24" />
              </th>
              <th scope="col" className="px-6 py-3 text-left font-bold text-sm">
                <Skeleton className="h-4 w-24" />
              </th>
              <th scope="col" className="px-6 py-3 text-left font-bold text-sm">
                <Skeleton className="h-4 w-20" />
              </th>
              <th scope="col" className="px-6 py-3 text-left font-bold text-sm">
                <div className="flex space-x-2">
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {[...Array(5)].map((_, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-4" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-32" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-16" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-24" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Skeleton className="h-4 w-20" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export { PassportTabelLoading };
