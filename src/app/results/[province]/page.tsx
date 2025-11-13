

'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Download, Search } from 'lucide-react';
import 'jspdf-autotable';

interface Result {
  id: number;
  student_id: string;
  full_name: string;
  gender: string;
  school: string;
  district: string;
  province: string;
  phone_number: string;
  subject: string;
  score: number;
  grade: string;
  exam_class: string;
  result: string;
}

const API_BASE = "http://192.168.100.203:8000";
const TOKEN_URL = `${API_BASE}/api/token/`;
const RESULTS_URL = `${API_BASE}/api/v1/filters/provinces/`; // your endpoint
const MOCK_USERNAME = "admin";
const MOCK_PASSWORD = "admin123";

export default function ProvinceResultsPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [filtered, setFiltered] = useState<Result[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        // Step 1: get access token
        const tokenRes = await fetch(TOKEN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: MOCK_USERNAME,
            password: MOCK_PASSWORD,
          }),
        });

        if (!tokenRes.ok) throw new Error("Failed to get token");

        const tokenData = await tokenRes.json();
        const accessToken = tokenData.access;

        // Step 2: fetch protected data
        const res = await fetch(RESULTS_URL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error(`Error fetching data (${res.status})`);

        const data = await res.json();
        setResults(data);
        setFiltered(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  function handleSearch() {
    if (!searchValue.trim()) return setFiltered(results);
    const value = searchValue.trim().toLowerCase();

    const filteredData = results.filter((r) =>
      r.full_name.toLowerCase().includes(value) ||
      r.student_id.toLowerCase().includes(value) ||
      r.school.toLowerCase().includes(value)
    );

    setFiltered(filteredData);
  }

  function handleDownloadCSV() {
    const csv = [
      ['ID', 'Student ID', 'Full Name', 'Gender', 'Subject', 'School', 'District', 'Province', 'Phone', 'Score', 'Grade', 'Class', 'Result'].join(','),
      ...filtered.map(r => [
        r.id,
        r.student_id,
        r.full_name,
        r.gender,
        r.subject,
        r.school,
        r.district,
        r.province,
        r.phone_number,
        r.score,
        r.grade,
        r.exam_class,
        r.result,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `province_results.csv`;
    link.click();
  }

  if (loading) return <h2 className="text-center mt-10">Loading...</h2>;
  if (error) return <h2 className="text-center text-red-600 mt-10">{error}</h2>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-4 sm:p-8">
      <header className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-center flex-1">
          លទ្ធផលសិស្សតាមខេត្ត
        </h1>
      </header>


      <Card className="bg-white shadow-lg">
        <CardContent className="p-4 space-y-4">
          <div className="flex flex-col sm:flex-row gap-3 justify-between items-center">
            <div className="flex gap-2 items-center w-full sm:w-auto">
              <Input
                placeholder="ស្វែងរកឈ្មោះសិស្ស ឬសាលារៀន..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="w-full sm:w-64"
              />
              <Button onClick={handleSearch}>
                <Search className="h-4 w-4 mr-2" />
                ស្វែងរក
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" onClick={handleDownloadCSV}>
                <Download className="h-4 w-4 mr-2" /> ទាញយក CSV
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full border text-sm">
              <thead className="bg-blue-600 text-white">
                <tr>
                  <th className="px-3 py-2 border">អត្តលេខ</th>
                  <th className="px-3 py-2 border">ឈ្មោះសិស្ស</th>
                  <th className="px-3 py-2 border">ភេទ</th>
                  <th className="px-3 py-2 border">មុខវិជ្ជា</th>
                  <th className="px-3 py-2 border">សាលារៀន</th>
                  <th className="px-3 py-2 border">ស្រុក</th>
                  <th className="px-3 py-2 border">ខេត្ត</th>
                  <th className="px-3 py-2 border">លេខទូរស័ព្ទ</th>
                  <th className="px-3 py-2 border">ពិន្ទុ</th>
                  <th className="px-3 py-2 border">ថ្នាក់</th>
                  <th className="px-3 py-2 border">លទ្ធផល</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-3 py-2 border text-center">{r.student_id}</td>
                      <td className="px-3 py-2 border">{r.full_name}</td>
                      <td className="px-3 py-2 border text-center">{r.gender}</td>
                      <td className="px-3 py-2 border">{r.subject}</td>
                      <td className="px-3 py-2 border">{r.school}</td>
                      <td className="px-3 py-2 border">{r.district}</td>
                      <td className="px-3 py-2 border">{r.province}</td>
                      <td className="px-3 py-2 border text-center">{r.phone_number}</td>
                      <td className="px-3 py-2 border text-center">{r.score}</td>
                      <td className="px-3 py-2 border text-center">{r.grade}</td>
                      <td
                        className={`px-3 py-2 border text-center font-semibold ${r.result === 'ជាប់' ? 'text-green-600' : 'text-red-600'}`}
                      >
                        {r.result}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={11} className="text-center py-4 text-gray-500">
                      មិនមានទិន្នន័យសិស្សទេ។
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
