"use client";

import { getUser } from "@/apis/user.apis";
import { useQuery } from "@tanstack/react-query";

function HomePage() {
  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  return (
    <div>
      {user?.data.map((item: any) => (
        <div key={item.name}>{item.name}</div>
      ))}
    </div>
  );
}

export default HomePage;
