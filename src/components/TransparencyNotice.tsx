"use client";

import { useState, useEffect } from "react";
import { Column, Row, Text, Button } from "@once-ui-system/core";
import { getFeatureFlags } from "@/lib/features";

/**
 * Transparency notice explaining personalization.
 * Per AGENTS.md: "This site adapts based on context as a demonstration of applied personalization."
 */
export function TransparencyNotice() {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const flags = getFeatureFlags();

  useEffect(() => {
    setMounted(true);
    // Check if user has already dismissed or opted out
    const dismissed = localStorage.getItem("transparency_notice_dismissed");
    const optedOut = localStorage.getItem("personalization_opt_out");
    
    // Show notice if enabled, not dismissed, and not opted out
    // Default to showing if flags are enabled (which they are by default)
    if (flags.transparency.showNotice && !dismissed && !optedOut) {
      // Small delay to ensure page is loaded
      setTimeout(() => {
        setIsVisible(true);
      }, 500);
    }
  }, [flags.transparency.showNotice]);

  if (!mounted || !isVisible) {
    return null;
  }

  const handleDismiss = () => {
    localStorage.setItem("transparency_notice_dismissed", "true");
    setIsVisible(false);
  };

  const handleOptOut = () => {
    localStorage.setItem("personalization_opt_out", "true");
    localStorage.setItem("transparency_notice_dismissed", "true");
    setIsVisible(false);
    // Reload to apply default experience
    window.location.reload();
  };

  return (
    <Column
      gap="12"
      padding="16"
      radius="m"
      background="surface"
      border="neutral-alpha-medium"
      style={{
        position: "fixed",
        bottom: "16px",
        left: "16px",
        zIndex: 9999,
        maxWidth: "320px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.2)",
      }}
    >
      <Text variant="body-default-s" onBackground="neutral-weak">
        This site adapts based on context as a demonstration of applied personalization.
      </Text>
      <Row gap="8" wrap>
        {flags.transparency.allowOptOut && (
          <Button variant="secondary" size="s" onClick={handleOptOut}>
            View default experience
          </Button>
        )}
        <Button variant="tertiary" size="s" onClick={handleDismiss}>
          Got it
        </Button>
      </Row>
    </Column>
  );
}
