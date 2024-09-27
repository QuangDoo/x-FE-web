import { getUser } from "@/apis/user.apis";
import { QueryClient } from "@tanstack/react-query";
import AudioPage from "./pages/audio-page";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <div className="text-white mt-28">
      {/* <AudioPage /> */}
      Hello
    </div>
  );
}
