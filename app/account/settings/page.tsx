'use client';
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Lock, User } from 'lucide-react';
import { toast } from 'sonner';
import { changePassword, updateAccount } from '@/server/controllers/user';
import { useAuthStore } from '@/hook/auth';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { changePasswordSchema } from '@/schema/user';
import z from 'zod';

// ✅ schema for updating profile
const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export default function SettingsPage() {
  const router = useRouter();
  const { authAdd, user } = useAuthStore();

  type changePassFieldType = z.infer<typeof changePasswordSchema>;
  type profileFieldType = z.infer<typeof profileSchema>;

  // 🔹 Password form
  const {
    formState: { isSubmitting: passSubmitting, errors: passErrors },
    handleSubmit: handlePassSubmit,
    register: registerPass,
    reset: resetPass,
  } = useForm<changePassFieldType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: { oldpass: '', newpass: '' },
  });

  // 🔹 Profile form
  const {
    formState: { isSubmitting: profileSubmitting, errors: profileErrors },
    handleSubmit: handleProfileSubmit,
    register: registerProfile,
    reset: resetProfile,
  } = useForm<profileFieldType>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user?.name || "" },
  });

  // Sync user when store changes
  useEffect(() => {
    if (user?.name) {
      resetProfile({ name: user.name });
    }
  }, [user, resetProfile]);

  // ✅ Update profile
  const updateAccuntInfo = async (data: profileFieldType) => {
    try {
      const updateAction = await updateAccount({ name: data.name });
      if (updateAction.status !== 200) throw new Error(updateAction.message || "Something went wrong");

      // update local store
      authAdd({
        ...user,
        name: data.name,
        email: user?.email ?? "", // Ensure email is always a string
        isVerified: user?.isVerified ?? false, // Ensure isVerified is always boolean
      });

      toast.success(updateAction.message);
    } catch (error: unknown) {
      toast.error((error as Error)?.message || "Failed to update profile");
    }
  };

  // ✅ Change password
  const changePass = async (data: changePassFieldType) => {
    try {
      const changePassAction = await changePassword({
        currentPassword: data.oldpass,
        newPassword: data.newpass,
      });

      if (changePassAction.status !== 200) {
        toast.error(changePassAction.message || "Invalid");
        return;
      }
      router.refresh();
      toast.success("Password changed successfully");
      resetPass();
    } catch (error: unknown) {
      toast.error((error as Error)?.message || "Failed to change password");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-6">
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
              <form onSubmit={handleProfileSubmit(updateAccuntInfo)} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Full Name</label>
                  <Input {...registerProfile("name")} type="text" />
                  {profileErrors.name && (
                    <p className="text-red-500 text-sm">{profileErrors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600">Phone</label>
                  <Input type="number" defaultValue="0123654445" disabled />
                </div>
                <Button 
                  type="submit" 
                  disabled={profileSubmitting}
                  className="mt-4 cursor-pointer"
                >
                  {profileSubmitting ? "Saving..." : "Save Profile"}
                </Button>
              </form>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security">
              <form onSubmit={handlePassSubmit(changePass)} className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Current Password</label>
                  <Input {...registerPass("oldpass")} type="password" />
                  {passErrors.oldpass && (
                    <p className="text-red-500 text-sm">{passErrors.oldpass.message}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-600">New Password</label>
                  <Input {...registerPass("newpass")} type="password" />
                  {passErrors.newpass && (
                    <p className="text-red-500 text-sm">{passErrors.newpass.message}</p>
                  )}
                </div>
                <Button 
                  type="submit" 
                  disabled={passSubmitting}
                  className="mt-4 cursor-pointer"
                >
                  {passSubmitting ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
