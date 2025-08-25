
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo Area */}
              <Link href="/" className="flex items-center">
                  <h1 className="text-black text-xl">Your Company </h1>
          {/* <Image
            src="/logo.png" 
            alt="Your Company Logo"
            width={150}
            height={40}
            priority 
          /> */}
        </Link>

        {/* Navigation Links */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link
            href="/"
            className="text-gray-600 transition-colors hover:text-gray-900"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="text-gray-600 transition-colors hover:text-gray-900"
          >
            About
          </Link>
          <Link
            href="/research"
            className="text-gray-600 transition-colors hover:text-gray-900"
          >
            Research
          </Link>
          <Link
            href="/contact"
            className="text-gray-600 transition-colors hover:text-gray-900"
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </header>
  );
}
