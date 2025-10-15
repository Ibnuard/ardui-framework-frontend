import { useAlert } from "@/context/AlertContext";
import { IconName } from "@/icons/HeroIcons";
import { useState } from "react";

export const useGetModule = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async ({ page = 1, limit = 10, search = "" } = {}) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/module?page=${page}&limit=${limit}&search=${search}`
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

export const useGetParentModule = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/module/parent", {
        method: "GET",
      });

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

export const useGetModuleDetail = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async ({ id }: { id: string }) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/module/${id}`);

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

export const useAddModule = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const alert = useAlert();

  const fetchData = async ({
    name,
    path,
    parentModuleId,
    status,
    icon,
  }: {
    name: string;
    path: string | undefined;
    parentModuleId: number | undefined;
    status: string;
    icon: IconName | undefined;
  }) => {
    try {
      setLoading(true);
      const res = await fetch("/api/module", {
        method: "POST",
        body: JSON.stringify({
          name: name,
          path: path,
          parentModuleId: parentModuleId,
          status: status || "Active",
          icon: icon,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to fetch modules");
      }

      const json = await res.json();
      setData(json);
      alert.success("Sukses membuat module.");
    } catch (err: any) {
      setError(err);
      alert.error("Gagal membuat module, mohon coba lagi!");
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, fetchData };
};

export const useDeleteModule = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const alert = useAlert();

  const fetchData = async ({ id }: { id: string }) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/module/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete modules");
      }

      const json = await res.json();
      setData(json);
      alert.success("Sukses menghapus module.");
    } catch (err: any) {
      setError(err);
      alert.error("Gagal menghapus module, mohon coba lagi!");
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, fetchData };
};

export const useEditModule = () => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const alert = useAlert();

  const fetchData = async ({
    id,
    data: payload,
  }: {
    id: string;
    data: any;
  }) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/module/${id}`, {
        method: "POST",
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to update modules");
      }

      const json = await res.json();
      setData(json);
      alert.success("Sukses mengupdate module.");
    } catch (err: any) {
      setError(err);
      alert.error("Gagal mengupdate module, mohon coba lagi!");
    } finally {
      setLoading(false);
    }
  };

  return { loading, data, error, fetchData };
};
