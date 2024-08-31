"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { AuthLoading, Authenticated, ConvexReactClient } from "convex/react";
import Loading from "../auth/loading";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

// const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL!;

const convexUrl = "https://necessary-curlew-448.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

export default function ConvexClientProvider({
  children,
}: ConvexClientProviderProps) {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
    >
      <ConvexProviderWithClerk useAuth={useAuth} client={convex}>
        <AuthLoading>
          <Loading />
        </AuthLoading>

        <Authenticated>{children}</Authenticated>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}
