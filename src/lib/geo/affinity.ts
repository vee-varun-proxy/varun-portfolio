import type { AffinityProfile, GeoLocation, VisitorSegment, ContentInterest } from "./types";
import { determineSegment } from "./detect";
import { getAvatarGender, getSessionId } from "../session";

/**
 * Select avatar based on geo bucket and random gender (per AGENTS.md).
 * 
 * Rules:
 * - avatar_geo = geo_bucket (if geo_known) or 'global' (if not)
 * - avatar_gender = random_choice(['male','female']) (deterministic per session)
 * - Neutral avatar must always exist as control
 */
function selectAvatar(geo: GeoLocation, sessionId: string): string {
  // Determine geo bucket
  let geoBucket: string;
  if (geo.countryCode === "US") {
    geoBucket = "us";
  } else if (geo.continent && geo.continent !== "Unknown") {
    // Use continent as bucket (normalized to lowercase, hyphenated)
    geoBucket = geo.continent.toLowerCase().replace(/\s+/g, "-");
  } else {
    geoBucket = "global";
  }

  // Get deterministic gender assignment
  const gender = getAvatarGender(sessionId);

  // Construct avatar path: /images/avatars/{geoBucket}-{gender}.jpg
  const avatarPath = `/images/avatars/${geoBucket}-${gender}.jpg`;

  // Return the calculated avatar path.
  // If the image doesn't exist, the browser will fail to load it and show a broken image.
  // In production, you could implement a file existence check, but for now we'll
  // return the path and let the browser handle missing images (or use onError handler).
  // The neutral avatar is always available as fallback at /images/avatar.jpg
  return avatarPath;
}

/**
 * Contextual greetings based on visitor segment
 */
const GREETINGS: Record<VisitorSegment, string> = {
  local: "Hey neighbor! 👋",
  "tech-hub": "Welcome, fellow technologist",
  federal: "Welcome",
  "drupal-community": "Hello, Drupal friend!",
  healthcare: "Welcome",
  international: "Welcome from across the globe",
  general: "Welcome",
};

/**
 * Greetings for content interest (used when interest overrides segment)
 */
const INTEREST_GREETINGS: Record<ContentInterest, string | null> = {
  frontend: null, // Use segment greeting
  drupal: "Hello, Drupal friend!",
  govtech: "Welcome", // Professional, understated
  general: null,
};

/**
 * Contextual messages to display based on segment
 */
const CONTEXTUAL_MESSAGES: Record<VisitorSegment, string> = {
  local:
    "I'm based right here in the DC metro area. Let's grab coffee and talk shop.",
  "tech-hub":
    "I've worked with teams across major tech hubs on enterprise platforms.",
  federal:
    "20 years delivering web platforms for federal and state agencies. I understand the constraints.",
  "drupal-community":
    "Active Drupal contributor – maybe we've met at a camp or con?",
  healthcare:
    "Currently building HIPAA-compliant healthcare platforms at Express Scripts.",
  international:
    "I've delivered projects for governments in Jamaica, St. Lucia, and Arizona state agencies.",
  general: "20 years building enterprise platforms with Drupal and modern frameworks.",
};

/**
 * Contextual messages for content interest (used when interest overrides segment)
 */
const INTEREST_CONTEXTUAL_MESSAGES: Record<ContentInterest, string | null> = {
  frontend: null, // Use segment message
  drupal: "Deep Drupal expertise from small nonprofits to federal platforms.",
  govtech: "20 years delivering web platforms for government. I understand compliance, accessibility, and the procurement process.",
  general: null,
};

/**
 * Featured content suggestions based on segment
 */
const FEATURED_CONTENT_BY_SEGMENT: Record<VisitorSegment, string> = {
  local: "/work/building-once-ui-a-customizable-design-system",
  "tech-hub": "/work/building-once-ui-a-customizable-design-system",
  federal: "/work/building-once-ui-a-customizable-design-system",
  "drupal-community": "/work/building-once-ui-a-customizable-design-system",
  healthcare: "/work/building-once-ui-a-customizable-design-system",
  international: "/work/building-once-ui-a-customizable-design-system",
  general: "/work/building-once-ui-a-customizable-design-system",
};

// Map content slugs to interests for better matching
const CONTENT_INTEREST_MAP: Record<string, ContentInterest> = {
  // Frontend-focused projects
  "building-once-ui-a-customizable-design-system": "frontend",
  "automate-design-handovers-with-a-figma-to-code-pipeline": "frontend",
  "simple-portfolio-builder": "frontend",
  // Drupal-focused projects (add when you have them)
  // "drupal-federal-platform": "drupal",
  // "enterprise-cms-migration": "drupal",
};

/**
 * Featured content suggestions based on content interest.
 * Overrides segment-based content when interest is detected.
 */
const FEATURED_CONTENT_BY_INTEREST: Record<ContentInterest, string> = {
  frontend: "/work/building-once-ui-a-customizable-design-system",
  drupal: "/work/building-once-ui-a-customizable-design-system", // Update when you have Drupal-specific projects
  govtech: "/blog/what-government-gets-wrong-about-website-migrations", // Update when you have govtech-specific projects
  general: "/work/building-once-ui-a-customizable-design-system",
};

/**
 * Build complete affinity profile for a visitor.
 * Avatar variant selected to isolate geo-based familiarity effects (per AGENTS.md).
 * Content interest can override segment-based featured content, greetings, and messages.
 */
export function buildAffinityProfile(
  geo: GeoLocation,
  sessionId?: string,
  interest?: ContentInterest | null,
): AffinityProfile {
  const segment = determineSegment(geo);
  const session = sessionId || getSessionId();

  // Use interest-based content if available, otherwise use segment-based
  const featuredContent = interest && interest !== "general"
    ? FEATURED_CONTENT_BY_INTEREST[interest]
    : FEATURED_CONTENT_BY_SEGMENT[segment];

  // Use interest-based greeting if available, otherwise use segment-based
  const greeting = (interest && INTEREST_GREETINGS[interest]) || GREETINGS[segment];

  // Use interest-based contextual message if available, otherwise use segment-based
  const contextualMessage = (interest && INTEREST_CONTEXTUAL_MESSAGES[interest]) || CONTEXTUAL_MESSAGES[segment];

  return {
    segment,
    greeting,
    avatarVariant: selectAvatar(geo, session),
    contextualMessage,
    featuredContent,
    interest: interest || undefined,
  };
}

/**
 * Get personalized headline based on visitor context
 */
export function getPersonalizedHeadline(segment: VisitorSegment, interest?: ContentInterest | null): string {
  // Interest-based headlines take priority
  if (interest && interest !== "general") {
    const interestHeadlines: Record<ContentInterest, string> = {
      frontend: "Modern frontend architecture for enterprise",
      drupal: "Drupal architect with 20 years of enterprise experience",
      govtech: "Government web platforms built right",
      general: "Building enterprise platforms with Drupal & React",
    };
    return interestHeadlines[interest];
  }

  const headlines: Record<VisitorSegment, string> = {
    local: "Building enterprise platforms in the DMV",
    "tech-hub": "Enterprise Drupal & React expertise",
    federal: "Trusted partner for government web platforms",
    "drupal-community": "Drupal contributor & enterprise architect",
    healthcare: "HIPAA-compliant healthcare platform specialist",
    international: "Global experience, enterprise results",
    general: "Building enterprise platforms with Drupal & React",
  };

  return headlines[segment];
}

/**
 * Get time-based greeting prefix based on visitor's timezone.
 */
export function getTimeBasedGreeting(timezone: string): string {
  try {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone: timezone,
    });
    const hour = Number.parseInt(formatter.format(now), 10);

    if (hour >= 5 && hour < 12) return "Good morning";
    if (hour >= 12 && hour < 17) return "Good afternoon";
    if (hour >= 17 && hour < 21) return "Good evening";
    return "Hello";
  } catch {
    return "Hello";
  }
}

/**
 * Get combined greeting: time-based prefix + segment-specific greeting.
 */
export function getCombinedGreeting(
  segment: VisitorSegment,
  timezone: string,
): string {
  const timePrefix = getTimeBasedGreeting(timezone);
  const segmentGreeting = GREETINGS[segment];

  // For general segment, just use time prefix
  if (segment === "general") {
    return timePrefix;
  }

  // Combine time prefix with segment greeting
  // Example: "Good morning, fellow technologist"
  return `${timePrefix}, ${segmentGreeting.toLowerCase()}`;
}
