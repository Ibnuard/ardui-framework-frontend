import { useAlert } from "@/context/AlertContext";
import { useState } from "react";

export const useAddRole = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const alert = useAlert();

  const fetchData = async ({ name }: { name: string }) => {
    setLoading(true);
    try {
      const res = await fetch("/api/user/role", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          status: "Active",
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch modules");
      }

      const json = await res.json();
      setData(json);
      alert.success("Berhasil menambahkan role.");
    } catch (err: any) {
      setError(err);
      alert.error("Gagal menambahkan role, mohon coba lagi!");
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, fetchData };
};

export const useGetRole = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async ({ page = 1, limit = 10, search = "" } = {}) => {
    try {
      const res = await fetch(
        `/api/user/role?page=${page}&limit=${limit}&search=${search}`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to fetch modules");
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
