import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Sessions } from "@/types/database";
import Image from "next/image";
import React from "react";

interface RecentSessionsTableProps {
  recentSessions: Sessions;
}

const RecentSessionsTable: React.FC<RecentSessionsTableProps> = ({
  recentSessions,
}) => {
  return (
    <Card className="w-full max-w-4xl mx-auto rounded-lg mt-28 mb-4">
      <CardHeader className="bg-gradient-to-r from-[#FBAD41] via-[#F6821F] to-[#F6821F] text-black rounded-lg">
        <CardTitle className="text-2xl font-bold">Recent Submissions</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-2 text-left text-lg md:text-4xl font-medium text-gray-500 uppercase tracking-wider">
                  #
                </th>
                <th className="px-4 py-2 text-left text-lg md:text-4xl font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
                <th className="px-4 py-2 text-left text-lg md:text-4xl font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-4 py-2 text-left text-lg md:text-4xl font-medium text-gray-500 uppercase tracking-wider">
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
                  <td className="px-4 py-4 whitespace-nowrap text-sm md:text-xl text-gray-900">
                    {index + 1}
                  </td>
                  <td className="px-1 md:px-4 py-4 whitespace-nowrap">
                    <Badge className="text-sm md:text-xl" variant="outline">
                      {submission.score}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm md:text-lg text-gray-500 break-normal">
                    <div className="flex flex-col break-normal">
                      <div className="w-full">
                        <span className="font-bold">User:</span>{" "}
                        {submission.userDescription}
                      </div>
                      <div className="max-h-96 break-normal">
                        <span className="font-bold">AI:</span>{" "}
                        {submission.aiImageDescription}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center">
                      <Image
                        src={submission.imageUrl}
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
};

export default RecentSessionsTable;
