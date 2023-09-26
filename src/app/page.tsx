"use client";
import React from "react";
import Panel from "./dashboard/panel/page";
import { redirect } from "next/navigation";

function IndexPage() {
  redirect("/dashboard/panel");
}

export default IndexPage;
