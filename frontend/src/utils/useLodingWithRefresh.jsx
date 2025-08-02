import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";

export const useLoadingWithRefresh = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/v1/auth/me", {
          withCredentials: true,
        });
        console.log(response.data);
        setUser(response.data);
      } catch (error) {
        console.error(error);
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };
    fetchMe();
  }, [navigate]);

  return { loading, user };
};

