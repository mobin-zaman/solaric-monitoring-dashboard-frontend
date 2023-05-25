import Link from "next/link";

export default function Custom404() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-gray-700">404</h1>
      <h2 className="text-2xl font-semibold text-gray-600">
        Sorry, page not found!
      </h2>
      <p className="text-gray-500 py-1">
        The page you are looking for does not exist. It might have been moved or
        deleted.
      </p>
      <Link href="/" className="px-4 py-2 mt-3 text-white bg-gray-700 rounded hover:bg-gray-600">
          Back to Home
      </Link>
    </div>
  );
}