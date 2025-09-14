import React from "react";
import { useContent } from "@thoughtbot/superglue";

interface RootIndexProps {
  header: {
    title: string;
    subtitle: string;
  };
}

export default function RootIndex() {
  const {
    header: { title, subtitle },
  } = useContent<RootIndexProps>();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <p className="text-lg">{subtitle}</p>
    </div>
  );
}
