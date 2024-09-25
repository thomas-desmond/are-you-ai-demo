import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchRecentSessions } from "@/lib/db";
import Image from "next/image";

export const runtime = "edge";

export default async function BehindTheScenes() {
  const recentSessions = await fetchRecentSessions();

  return (
      <Card className="w-full max-w-4xl mx-auto rounded-lg my-6">
        <CardHeader className="bg-[#F6821F] text-black rounded-lg">
          <CardTitle className="text-2xl font-bold">
            Recent Submissions
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="px-4 py-2 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-4 py-2 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-4 py-2 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-2 text-left text-lg font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentSessions?.results.map((submission, index) => (
                  <tr
                    key={submission.ID}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-xl text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge
                        className="text-xl"
                        variant={
                          submission.score >= 90
                            ? "success"
                            : submission.score >= 80
                            ? "warning"
                            : "destructive"
                        }
                      >
                        {submission.score}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-lg text-gray-500">
                      {submission.userDescription}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <Image
                          src={submission.imageURL}
                          alt={submission.userDescription}
                          width={150}
                          height={150}
                          className="rounded-lg"
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
  );
}
