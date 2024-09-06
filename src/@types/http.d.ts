interface ResponseApi {
  status: number;
  statusText: string;
  headers: Record<string, string>;
  body: string;
}
