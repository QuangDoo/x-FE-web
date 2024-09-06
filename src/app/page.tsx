import { getUser } from "@/apis/user.apis";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import HomePage from "./home-page";
import Header from "@/components/layout/header";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Header />

        {/* <HomePage /> */}
      </main>
    </HydrationBoundary>
  );
}
