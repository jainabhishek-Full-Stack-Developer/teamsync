import Link from "next/link";

const Notfound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-white-100">
            <div className="text-center bg-white p-8  max-w-md mx-auto">
                <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                <p className="text-xl text-gray-700 mb-4">Page Not Found</p>
                <p className="text-lg text-gray-500">We couldn't find the page you're looking for. Please check the URL or go back to the homepage.</p>
                <Link href="/" className="inline-block px-6 py-2 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 mt-5">Home</Link>
            </div>
        </div>
    )
}

export default Notfound;
