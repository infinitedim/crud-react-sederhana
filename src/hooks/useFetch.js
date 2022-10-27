import React, { useState, useEffect } from "react";

const baseUrl = "https://musik98.herokuapp.com";

export default function useFetchApi(
  url,
  { method = "get", skip = false, headers = {} },
) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchApi(path, data) {
    if (skip) {
      console.log("Skipped");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(baseUrl + url + path, {
        body: data,
        headers,
        method,
      })
        .then((res) => res.json())
        .catch(() => null);

      setIsLoading(false);
      setData(response || null);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
      setData(null);
      setError(error?.message ?? "Can't fetch api");
    }
  }

  async function get() {
    if (skip) {
      console.log("Skipped");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(baseUrl + url)
        .then((res) => res.json())
        .catch(() => null);

      setIsLoading(false);
      setData(response || null);
    } catch (error) {
      setData(null);
      setIsLoading(false);
      setError(error?.message ?? "Error");
    }
  }

  useEffect(() => {
    if (method?.toUpperCase() === "GET") {
      if (skip) {
        console.log("Skipped");
        return;
      }

      get();
    }
  }, [url, skip]);

  if (method?.toUpperCase() === "GET") {
    return {
      data,
      error,
      refetch: get,
      isLoading,
    };
  }

  return [
    fetchApi,
    {
      isLoading,
      isError: error,
      responseData: data,
    },
  ];
}
