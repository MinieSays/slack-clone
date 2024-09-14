"use client";

// import { api } from "../../convex/_generated/api";
import * as dotenv from "dotenv";
import { ReactNode } from "react";
import { ConvexReactClient } from "convex/react";
dotenv.config({ path: ".env.local" });
import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";

// const client = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

// client.query(api.tasks.get).then(console.log);

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  return (
    <ConvexAuthNextjsProvider client={convex}>
      {children}
    </ConvexAuthNextjsProvider>
  );
}
