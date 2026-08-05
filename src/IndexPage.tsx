import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "./App";

function IndexPage() {
  const navigate = useNavigate();
  const { user } = useUserContext();

  useEffect(() => {
    if (!user) navigate("/signin");
    else navigate("/requests");
  }, []);

  return null;
}

export default IndexPage;
