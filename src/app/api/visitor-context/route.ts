import { NextResponse } from "next/server";
import { buildAffinityProfile, determineSegment } from "@/lib/geo";
import { detectGeoLocation } from "@/lib/geo/detect-server";
import type { VisitorContext } from "@/lib/geo/types";
import { getSessionId } from "@/lib/session";
import { headers } from "next/headers";

// Using nodejs runtime - works both locally and on Vercel
// Edge runtime would be faster but requires static export declaration

export async function GET() {
  try {
    const geo = await detectGeoLocation();
    const segment = determineSegment(geo);
    
    // Get session ID from cookie or generate one
    // Note: In production, you'd read from a cookie set by middleware
    const headersList = await headers();
    const sessionCookie = headersList.get("cookie");
    let sessionId = sessionCookie
      ?.split(";")
      .find((c) => c.trim().startsWith("visitor_session="))
      ?.split("=")[1];

    // If no session cookie, we'll generate one client-side
    // For server-side, use a temporary ID that will be replaced
    if (!sessionId) {
      sessionId = `temp-${Date.now()}`;
    }

    const affinity = buildAffinityProfile(geo, sessionId);

    const visitorContext: VisitorContext = {
      geo,
      segment,
      affinity,
    };

    return NextResponse.json(visitorContext, {
      headers: {
        // Cache for 1 hour, allow stale for 1 day
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error detecting visitor context:", error);

    // Return default context on error
    const defaultContext: VisitorContext = {
      geo: {
        country: "United States",
        countryCode: "US",
        region: "",
        city: "",
        timezone: "America/New_York",
        continent: "North America",
      },
      segment: "general",
      affinity: {
        segment: "general",
        greeting: "Welcome",
        avatarVariant: "/images/avatar.jpg",
        contextualMessage: "15+ years building enterprise platforms with Drupal and React.",
      },
    };

    return NextResponse.json(defaultContext);
  }
}
