"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({ isAdmin }) {
  const path = usePathname();

  return (
    <div className="flex mx-auto gap-4 tabs justify-center flex-wrap">
      <Link className={path === "/profile" ? "active" : ""} href={"/profile"}>
        Profile
      </Link>
      {isAdmin && (
        <>
          <Link
            className={path === "/categories" ? "active" : ""}
            href={"/categories"}
          >
            Categories
          </Link>
          <Link className={path.includes('/items') ? "active" : ""} href={"/items"}>
            Items
          </Link>
          <Link className={path.includes('/users') ? "active" : ""} href={"/users"}>
            Users
          </Link>
        </>
      )}
      <Link className={path === "/orders" ? "active" : ""} href={"/orders"}>
            Orders
          </Link>
    </div>
  );
}
