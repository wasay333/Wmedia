"use client";
import { trpc } from "@/trpc/client";
import React from "react";

const PageClient = () => {
  const [data] = trpc.hello.useSuspenseQuery({
    text: "Wasay",
  });
  return <div>PageClient say: {data.greeting}</div>;
};

export default PageClient;
