"use client";

import React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

export function Avatar({ className = "", ...props }) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={`relative flex size-8 shrink-0 overflow-hidden rounded-full ${className}`}
      {...props}
    />
  );
}

export function AvatarImage({ className = "", ...props }) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={`aspect-square size-full ${className}`}
      {...props}
    />
  );
}

export function AvatarFallback({ className = "", ...props }) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={`bg-muted flex size-full items-center justify-center rounded-full ${className}`}
      {...props}
    />
  );
}
