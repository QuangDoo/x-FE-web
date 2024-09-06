const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const http = async <TData>(
  endpoint: string,
  options = {} as RequestInit
): Promise<ApiResponse<TData>> => {
  const url = `${BASE_URL}${endpoint}`;

  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    ...options,
  };

  try {
    const response = await fetch(url, defaultOptions);
    const responseBody = await response.json();

    if (!response.ok) {
      // Handle HTTP errors with specific response format
      const errorResponse = responseBody as ApiResponse<TData>;
      throw new Error(errorResponse.message || "Failed to fetch");
    }

    return responseBody as ApiResponse<TData>;
  } catch (error) {
    if (error instanceof Error) {
      // Handle fetch or JSON parsing errors
      console.error("fetch error :>> ", error.message);

      throw error;
    }

    throw new Error("An unknown error occurred");
  }
};

export default http;
