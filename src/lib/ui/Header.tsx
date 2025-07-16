import Link from "next/link"

export const Header = () => {
  return(
    <header className="bg-gray-900 text-white px-6 py-4">
      <nav className="flex flex-center gap-6" >
        <p className="text-lg  hover:underline" >Drink Stock</p>
      </nav>
    </header>
  )
}