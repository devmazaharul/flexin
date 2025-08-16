
import { redirect } from 'next/navigation';


export default async function page() {
  redirect("/products")
  // return (
  //   <>
  //     <div className="h-screen items-center w-full flex text-center">
  //       <Button variant={'default'}>
  //         <Link href={'/products'}>Products</Link>
  //       </Button>
  //     </div>
  //   </>
  // );
}
