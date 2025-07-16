import Link from "next/link";

export const Header = () => {
  return(
    <header className="bg-gray-900 text-white px-5 py-4">
      <nav className="flex items-center gap-6" >
        <Link href="/" className="text-lg  hover:underline" >Drink Stock</Link>
        {/* <Link href="/detail" className="hover:underline" >Detail</Link> */}
      </nav>
    </header>
  )
}