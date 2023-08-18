import { BiSolidError } from "react-icons/bi";

const FetchError = () => (
  <div className="w-full flex justify-center items-center bg-gray-600/20 dark:text-white rounded-lg border-4 border-gray-700 text-xl gap-y-2 py-4">
    <span className="text-yellow-300 mr-4">
      <BiSolidError size={26} />
    </span>
    <h2>Something went wrong with fetching data!</h2>
  </div>
);

export default FetchError;
