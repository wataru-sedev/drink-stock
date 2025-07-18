import Link from "next/link";

export const Header = () => {
  return(
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white px-5 py-4">
      <nav className="flex items-center gap-6" >
        <Link href="/" className="text-lg  hover:underline" >ぎゃあてい</Link>
      </nav>
    </header>
  )
}