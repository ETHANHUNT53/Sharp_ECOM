import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useSelector((store) => store.user);
  console.log(user);
  if (!user) {
    return (
      <div className="text-center mt-10 mb-[30%]">
        Checking authentication... Sign In to Continue
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
