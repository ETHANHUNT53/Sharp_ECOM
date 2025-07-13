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
      <div className="text-center mt-10 mb-[30%]">
        Checking authentication... Sign In to Continue
        <button
          onClick={handleClick}
          className={`w-full text-center rounded-xl py-3 px-6 font-semibold text-lg transition-all duration-500 ${"bg-green-700 text-white hover:bg-green-800 cursor-pointer"}`}
        >
          Sign In
        </button>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
