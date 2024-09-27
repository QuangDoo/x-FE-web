import { getUser } from "@/apis/user.apis";
import Header from "@/components/layout/header";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { SquareArrowDownLeft } from "lucide-react";
import AudioPage from "./pages/audio-page";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <div className="text-white mt-28">
      <AudioPage />
    </div>
  );
}
