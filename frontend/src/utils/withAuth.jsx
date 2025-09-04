import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (WrappedComponent) => {
  const AuthComponent = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const isAuthenticated = () => {
      const token = localStorage.getItem("token");
      return token && token.length > 0; // Basic check for token presence
    };

    useEffect(() => {
      if (!isAuthenticated()) {
        navigate("/auth", { replace: true });
      } else {
        setLoading(false);
      }
    }, [navigate]);

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p>Loading...</p>
        </div>
      );
    }

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
