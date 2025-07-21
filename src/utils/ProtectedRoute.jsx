import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  // console.log(user);
  const handleClick = () => {
    navigate("/login");
  };
  if (!user) {
    return (
      <div className="text-center mb-[20%] md:pt-[8%] min-h-screen pt-[30%] sm:pt-[30%] lg:pt-[30%] ">
        <h3 className="sm:text-xl font-semibold md:text-xl lg:text-xl ">
          Checking authentication... Sign In to Continue
        </h3>
        <div>
          <button
            onClick={handleClick}
            className={`w-[30%] mt-[3%] text-center rounded-xl py-3 px-6 font-semibold text-lg transition-all duration-500 ${"bg-green-700 text-white hover:bg-green-800 cursor-pointer"}`}
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
