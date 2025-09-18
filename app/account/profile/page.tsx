'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { User, Mail, MapPin, Verified, User2 } from 'lucide-react';
import Link from 'next/link';
import { useAuthStore } from '@/hook/auth';

export default function ProfilePage() {
  const userdata=useAuthStore((pre)=>pre.user)



  return (
    <div className="flex justify-center items-center min-h-screen p-6">
      <Card className="w-full max-w-2xl shadow-2xl shadow-gray-100 rounded-2xl border-gray-100">
        <CardContent className="p-8 space-y-6">
          {/* Profile Header */}
          <div className="flex items-center space-x-4">
        <p className=' rounded-full p-1 border-3 border-gray-100'> <User2 size={50}/></p>
            <div>
              <h2 className="text-xl font-bold text-gray-800 capitalize">{userdata?.name || "Flexin user"}</h2>
              <p className="text-gray-500">flexin user</p>
            </div>
          </div>

          {/* Profile Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <Mail size={16} /> Email
              </label>
              <Input type="email" className='lowercase' value={userdata?.email} readOnly />
            </div>
            <div>
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <Verified size={16} /> status
              </label>
              <Input type="text" value={userdata?.isVerified ?"Verified":"Non verified"} readOnly />
            </div>
            <div>
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <User size={16} /> Username
              </label>
              <Input type="text" value="flexin_user" readOnly />
            </div>
            <div>
              <label className="text-sm text-gray-600 flex items-center gap-2">
                <MapPin size={16} /> Address
              </label>
              <Input type="text" value="Bangladesh" readOnly />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4">
            <Button variant="default" className='cursor-pointer '>
              <Link href={"/account/settings"}>Edit Profile</Link>
            </Button>
           
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
