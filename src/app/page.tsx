"use client";
import { redirect } from "next/navigation";

function IndexPage() {
  redirect("/dashboard/panel");
}

export default IndexPage;
