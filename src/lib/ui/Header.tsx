import Link from "next/link";

export const Header = () => {
  return(
    <header className="fixed top-0 left-0 w-full z-50 bg-gray-900 text-white px-5 py-3">
      <nav >
        <Link href="/" className="flex text-lg gap-1" >
          <img src="/apple-touch-icon.png" alt="ロゴ" width={ 28 } className="rounded" />
          ぎゃあてい
        </Link>
      </nav>
    </header>
  )
}