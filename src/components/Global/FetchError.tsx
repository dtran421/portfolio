import { BiSolidError } from "react-icons/bi";

const FetchError = () => (
  <div className="w-full flex justify-center items-center bg-gray-600/20 dark:text-white rounded-lg border-4 border-gray-700 text-xl py-6 mt-10">
    <span className="text-yellow-300 mr-4">
      <BiSolidError />
    </span>
    Something went wrong with fetching data!
  </div>
);

export default FetchError;
