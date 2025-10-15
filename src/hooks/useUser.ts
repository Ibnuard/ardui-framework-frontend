import { useState } from "react";

export const useGetUsers = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async ({ page = 1, limit = 10, search = "" } = {}) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/user?page=${page}&limit=${limit}&search=${search}`
      );

      if (!res.ok) {
        throw new Error("Failed to fetch users");
      }

      const json = await res.json();
      setData(json);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, fetchData };
};
