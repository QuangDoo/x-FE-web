"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";

const HEADER_HEIGHT = 112;

function Header() {
  const [lastScrollY, setLastScrollY] = useState(0); // Vị trí cuộn trước đó
  const [headerY, setHeaderY] = useState(0); // Vị trí Y của header
  const [scrollDirection, setScrollDirection] = useState(""); // Hướng cuộn (up/down)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Kiểm tra hướng cuộn (up/down)
      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      // Khi cuộn xuống: header sẽ bị ẩn dần dựa theo khoảng cách đã cuộn
      if (scrollDirection === "down") {
        setHeaderY((prevY) =>
          Math.max(prevY - (currentScrollY - lastScrollY), -HEADER_HEIGHT)
        ); // Tối đa ẩn đi HEADER_HEIGHT
      }

      // Khi cuộn lên: header sẽ xuất hiện dần
      if (scrollDirection === "up") {
        setHeaderY((prevY) =>
          Math.min(prevY + (lastScrollY - currentScrollY), 0)
        ); // Tối đa trở lại vị trí ban đầu (0)

        // Thêm điều kiện để tránh vượt quá giá trị 0
        if (headerY >= 0) {
          setHeaderY(0); // Đảm bảo không vượt quá 0
        }
      }

      setLastScrollY(currentScrollY); // Cập nhật vị trí cuộn trước đó
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrollDirection, lastScrollY]);

  console.log("headerY :>> ", headerY);

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{ y: headerY }} // Điều khiển vị trí Y của header theo giá trị headerY
      transition={{ type: "spring", stiffness: 100, damping: 20 }} // Hiệu ứng smooth
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        zIndex: 1000,
      }}
      className="backdrop-blur-sm shadow-lg"
    >
      <div className="flex items-center justify-between p-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <div className="w-full place-items-center grid">
          <Image
            src={
              "https://freepnglogo.com/images/all_img/1691832581twitter-x-icon-png.png"
            }
            alt="Ezinn logo"
            width={40}
            height={40}
          />
        </div>

        <Link
          href="/premium"
          className="text-[14px] text-blue-300 px-3 bg-blue-400/25 rounded-full spin-in-0 animate-bounce"
        >
          Book!
        </Link>
      </div>

      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="flex items-center">
          <TabsTrigger value="account" className="w-full flex-1">
            For you
          </TabsTrigger>
          <TabsTrigger value="password" className="w-full flex-1">
            Following
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </motion.header>
  );
}

export default Header;
