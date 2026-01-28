"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { VisitorContext, AffinityProfile, GeoLocation, VisitorSegment, ContentInterest } from "@/lib/geo/types";
import { getFeatureFlags } from "@/lib/features";
import { detectContentInterest, storeInterest } from "@/lib/intent/detect";
import { buildAffinityProfile } from "@/lib/geo/affinity";

interface VisitorContextValue {
  geo: GeoLocation | null;
  affinity: AffinityProfile | null;
  segment: VisitorSegment;
  isLoading: boolean;
  error: Error | null;
  isOptedOut: boolean;
}

const VisitorCtx = createContext<VisitorContextValue>({
  geo: null,
  affinity: null,
  segment: "general",
  isLoading: true,
  error: null,
  isOptedOut: false,
});

export function useVisitorContext() {
  return useContext(VisitorCtx);
}

interface VisitorContextProviderProps {
  children: ReactNode;
  // Server-side detected context (passed from server component)
  initialContext?: VisitorContext;
}

/**
 * Provider that makes visitor context available throughout the app.
 * Can receive initial context from server-side detection or fetch client-side.
 * Respects opt-out preference for default experience.
 */
export function VisitorContextProvider({
  children,
  initialContext,
}: VisitorContextProviderProps) {
  const flags = getFeatureFlags();
  const [isOptedOut, setIsOptedOut] = useState(false);

  // Check opt-out preference
  useEffect(() => {
    if (typeof window !== "undefined") {
      const optedOut = localStorage.getItem("personalization_opt_out") === "true";
      setIsOptedOut(optedOut);
    }
  }, []);

  // If opted out or personalization disabled, use default context
  const shouldPersonalize = flags.personalization.enabled && !isOptedOut;

  const [context, setContext] = useState<VisitorContextValue>({
    geo: shouldPersonalize ? (initialContext?.geo || null) : null,
    affinity: shouldPersonalize ? (initialContext?.affinity || null) : null,
    segment: shouldPersonalize ? (initialContext?.segment || "general") : "general",
    isLoading: shouldPersonalize ? !initialContext : false,
    error: null,
    isOptedOut: !shouldPersonalize,
  });

  useEffect(() => {
    // If opted out or disabled, don't fetch
    if (!shouldPersonalize) {
      setContext((prev) => ({
        ...prev,
        isLoading: false,
        isOptedOut: true,
      }));
      return;
    }

    // Detect content interest client-side (privacy-friendly)
    const detectedInterest = detectContentInterest();
    
    // If we have initial context from server, merge interest into it
    if (initialContext && detectedInterest) {
      const updatedAffinity = buildAffinityProfile(
        initialContext.geo,
        undefined, // sessionId will be generated
        detectedInterest
      );
      
      setContext((prev) => ({
        ...prev,
        affinity: updatedAffinity,
        isLoading: false,
      }));
      return;
    }

    // If we already have initial context from server (without interest), just mark as loaded
    if (initialContext) {
      // Still try to detect and merge interest
      if (detectedInterest) {
        const updatedAffinity = buildAffinityProfile(
          initialContext.geo,
          undefined,
          detectedInterest
        );
        setContext((prev) => ({
          ...prev,
          affinity: updatedAffinity,
          isLoading: false,
        }));
      } else {
        setContext((prev) => ({
          ...prev,
          isLoading: false,
        }));
      }
      return;
    }

    // Fetch context from API endpoint
    async function fetchVisitorContext() {
      try {
        const response = await fetch("/api/visitor-context");
        if (!response.ok) {
          throw new Error("Failed to fetch visitor context");
        }
        const data: VisitorContext = await response.json();
        
        // Merge detected interest into affinity profile
        let finalAffinity = data.affinity;
        if (detectedInterest) {
          finalAffinity = buildAffinityProfile(
            data.geo,
            undefined,
            detectedInterest
          );
        }
        
        setContext({
          geo: data.geo,
          affinity: finalAffinity,
          segment: data.segment,
          isLoading: false,
          error: null,
          isOptedOut: false,
        });
      } catch (err) {
        setContext((prev) => ({
          ...prev,
          isLoading: false,
          error: err instanceof Error ? err : new Error("Unknown error"),
        }));
      }
    }

    fetchVisitorContext();
  }, [initialContext, shouldPersonalize]);

  return <VisitorCtx.Provider value={context}>{children}</VisitorCtx.Provider>;
}
