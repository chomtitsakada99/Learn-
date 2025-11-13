'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { provinces, subjects, googleFormLinks } from '@/data/moeys-data';
import { Save, Copy, ExternalLink } from 'lucide-react';

export default function AdminPage() {
    const [links, setLinks] = useState<Record<string, string>>({});
    const [savedMessage, setSavedMessage] = useState<string>('');

    useEffect(() => {
        // Initialize with existing links
        setLinks(googleFormLinks);
    }, []);

    const handleLinkChange = (key: string, value: string) => {
        setLinks(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const handleSave = () => {
        // In a real app, you'd save this to a database
        // For now, we'll just show a success message
        setSavedMessage('Links saved successfully!');
        setTimeout(() => setSavedMessage(''), 3000);

        // You can also copy the updated data to clipboard
        const updatedData = `export const googleFormLinks: Record<string, string> = ${JSON.stringify(links, null, 2)};`;
        navigator.clipboard.writeText(updatedData);
    };

    const copyAllLinks = () => {
        const allLinks = Object.entries(links)
            .map(([key, value]) => `${key}: ${value || 'Not set'}`)
            .join('\n');
        navigator.clipboard.writeText(allLinks);
        setSavedMessage('All links copied to clipboard!');
        setTimeout(() => setSavedMessage(''), 3000);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            Admin Panel - តាមប្រព័ន្ធប្រឡងគម្រោង GEIP Links
                        </h1>
                        <p className="text-lg text-gray-600">
                            Manage តាមប្រព័ន្ធប្រឡងគម្រោង GEIP links for each province and subject combination
                        </p>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center mb-6 space-x-4">
                        <Button onClick={handleSave} size="lg" className="bg-green-600 hover:bg-green-700">
                            <Save className="mr-2 h-5 w-5" />
                            Save All Links
                        </Button>
                        <Button onClick={copyAllLinks} variant="outline" size="lg">
                            <Copy className="mr-2 h-5 w-5" />
                            Copy All Links
                        </Button>
                    </div>

                    {/* Success Message */}
                    {savedMessage && (
                        <div className="text-center mb-6">
                            <div className="inline-block bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                                {savedMessage}
                            </div>
                        </div>
                    )}

                    {/* Links Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {provinces.map((province) => (
                            <Card key={province.id} className="shadow-md">
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-lg">
                                        <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 inline-flex items-center justify-center text-sm font-bold mr-2">
                                            {province.id}
                                        </span>
                                        {province.name_km}
                                    </CardTitle>
                                    <p className="text-sm text-muted-foreground">{province.name}</p>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {subjects.map((subject) => {
                                        const key = `${province.name}-${subject.name}`;
                                        const link = links[key] || '';

                                        return (
                                            <div key={subject.name} className="space-y-2">
                                                <Label className="text-sm font-medium">
                                                    {subject.name_km} ({subject.name})
                                                </Label>
                                                <div className="flex space-x-2">
                                                    <Input
                                                        value={link}
                                                        onChange={(e) => handleLinkChange(key, e.target.value)}
                                                        placeholder="Enter តាមប្រព័ន្ធប្រឡងគម្រោង GEIP URL"
                                                        className="flex-1"
                                                    />
                                                    {link && (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => window.open(link, '_blank')}
                                                        >
                                                            <ExternalLink className="h-4 w-4" />
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Instructions */}
                    <Card className="mt-8">
                        <CardHeader>
                            <CardTitle>Instructions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 text-sm text-gray-600">
                            <p>1. Enter តាមប្រព័ន្ធប្រឡងគម្រោង GEIP URLs for each province and subject combination</p>
                            <p>2. Click "Save All Links" to save your changes</p>
                            <p>3. Use "Copy All Links" to copy the data for manual update in the code</p>
                            <p>4. The links will be used to embed តាមប្រព័ន្ធប្រឡងគម្រោង GEIP in the exam pages</p>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
