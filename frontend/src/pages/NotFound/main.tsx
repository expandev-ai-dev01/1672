import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="text-center">
      <h1 className="text-6xl font-bold text-gray-800">404</h1>
      <p className="text-2xl mt-4">Page Not Found</p>
      <p className="mt-2 text-gray-600">The page you are looking for does not exist.</p>
      <Link
        to="/"
        className="mt-6 inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition-colors"
      >
        Go to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;
