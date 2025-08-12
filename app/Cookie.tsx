// app/signup/page.tsx
import { createUser } from '@/server/controllers/user'

// ✅ Server Action must be outside the component
async function signupAction(formData: FormData) {
  'use server'
  const data = {
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const res = await createUser(data)
  console.log(res)

  // optionally: return redirect("/success") or revalidatePath("/")
}

export default  function Cookie() {
  return (
    <form action={signupAction} className="space-y-4 max-w-md mx-auto mt-10">
      <input type="text" name="name" defaultValue="Azil Islam" className="w-full border p-2" />
      <input type="email" name="email" defaultValue="azil6@gmail.com" className="w-full border p-2" />
      <input type="password" name="password" defaultValue="11223" className="w-full border p-2" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  )
}
