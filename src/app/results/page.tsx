'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Province {
  province: string; // matches your API structure
}

const API_BASE = "http://192.168.100.203:8000";
const TOKEN_URL = `${API_BASE}/api/token/`;
const RESULTS_URL = `${API_BASE}/api/v1/filters/provinces/`;
const MOCK_USERNAME = "admin";
const MOCK_PASSWORD = "admin123";

export default function ResultsPage() {
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchProvinces() {
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

        // Step 2: fetch provinces
        const res = await fetch(RESULTS_URL, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (!res.ok) throw new Error(`Error fetching data (${res.status})`);

        const data: Province[] = await res.json();
        setProvinces(data); // update provinces for UI
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProvinces();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Header */}
      <header className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <div className="flex items-center gap-3">
              <Link href="/welcome">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" /> ត្រឡប់
                </Button>
              </Link>
              <Image
                src="/moeys-logo.png"
                alt="MoEYS Logo"
                width={60}
                height={60}
                className="h-14 w-auto"
                priority
              />
            </div>
            <Link href="/welcome">
              <Button variant="ghost" size="sm">
                <Home className="h-4 w-4 mr-2" /> ទំព័រដើម
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Page content */}
      <div className="py-10 px-4 max-w-6xl mx-auto space-y-6">
        <h2 className="text-2xl font-semibold text-center mb-4">
          MoEYS EDTECH APP
        </h2>
        <p className="text-center mb-4 text-gray-700">
          សូមជ្រើសរើសខេត្តដើម្បីមើលលទ្ធផលសិស្ស
        </p>

        {loading ? (
          <p className="text-center text-gray-500">កំពុងផ្ទុកទិន្នន័យ...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {provinces.map((province) => (
              <Link
                href={`/results/${province.province
                  .replace(/\s+/g, '-')
                  .toLowerCase()}`}
                key={province.province}
              >
                <Card className="border border-gray-200 shadow-sm hover:shadow-lg hover:border-blue-600 transition bg-white cursor-pointer">
                  <CardContent className="flex justify-center items-center h-32">
                    <span className="text-lg text-center font-semibold">
                      {province.province}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
