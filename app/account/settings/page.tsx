'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Lock, User } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="flex justify-center items-center min-h-screen  p-6">
      <Card className="w-full max-w-3xl shadow-2xl shadow-gray-100 rounded-2xl border-gray-100">
        <CardContent className="p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Account Settings</h2>

          <Tabs defaultValue="profile" className="w-full">
            {/* Tab List */}
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="profile" className="flex cursor-pointer gap-2 items-center">
                <User size={16} /> Profile
              </TabsTrigger>
              <TabsTrigger value="security" className="flex gap-2 items-center cursor-pointer ">
                <Lock size={16} /> Security
              </TabsTrigger>
     
        
            </TabsList>

            {/* Profile Tab */}
            <TabsContent value="profile">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <Input type="text" defaultValue="Mazaharul Islam" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <Input type='number' defaultValue='0123654445'/>
                </div>
                <Button className="mt-4 cursor-pointer ">Save Profile</Button>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Current Password</label>
                  <Input type="password" />
                </div>
                <div>
                  <label className="text-sm text-gray-600">New Password</label>
                  <Input type="password" />
                </div>
                <Button className="mt-4 cursor-pointer ">Update Password</Button>
              </div>
            </TabsContent>

       
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
