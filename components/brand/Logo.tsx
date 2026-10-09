import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "full" | "icon" | "wordmark";
  theme?: "gradient" | "white" | "black";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  href?: string | null;
  asSpinner?: boolean;
}

export const LogoIcon: React.FC<{
  size?: number;
  theme?: "gradient" | "white" | "black";
  className?: string;
  asSpinner?: boolean;
}> = ({ size = 36, theme = "gradient", className, asSpinner = false }) => {
  const gradientId = React.useId();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(
        "transition-transform duration-300",
        asSpinner && "animate-spin",
        className
      )}
      style={{
        filter:
          theme === "gradient"
            ? "drop-shadow(0px 4px 14px rgba(37, 99, 235, 0.35))"
            : undefined,
      }}
    >
      <defs>
        {/* Executive Professional Gradient: Royal Sapphire & Electric Cobalt */}
        <linearGradient
          id={gradientId}
          x1="0"
          y1="0"
          x2="64"
          y2="64"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="45%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
      </defs>

      {/* Rounded square container with 25% border-radius (rx=16 on 64px) */}
      <rect
        width="64"
        height="64"
        rx="16"
        fill={
          theme === "white"
            ? "#FFFFFF"
            : theme === "black"
            ? "#0F172A"
            : `url(#${gradientId})`
        }
      />

      {/* Subtle inner highlight border for depth */}
      <rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="15"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1.5"
        fill="none"
      />

      {/* L stroke: starts top-left, goes down, turns right */}
      <path
        d="M16 16 V47 H34"
        stroke={theme === "white" ? "#2563EB" : "#FFFFFF"}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 1 stroke: diagonal serif into vertical stem */}
      <path
        d="M42 25 L48 17 V47"
        stroke={theme === "white" ? "#2563EB" : "#FFFFFF"}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const Logo: React.FC<LogoProps> = ({
  variant = "full",
  theme = "gradient",
  size = "md",
  className,
  href = "/",
  asSpinner = false,
}) => {
  const pixelSizes = {
    sm: 26,
    md: 34,
    lg: 44,
    xl: 56,
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const content = (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 font-heading tracking-tight select-none group",
        className
      )}
    >
      {variant !== "wordmark" && (
        <LogoIcon
          size={pixelSizes[size]}
          theme={theme}
          asSpinner={asSpinner}
          className="group-hover:scale-105 transition-transform duration-300"
        />
      )}
      {variant !== "icon" && (
        <span
          className={cn(
            "font-extrabold flex items-center leading-none",
            textSizes[size],
            theme === "white" ? "text-white" : "text-slate-900 dark:text-white"
          )}
        >
          <span>Listone</span>
          <span className="bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent ml-0.5 font-black">
            .ai
          </span>
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-lg"
      >
        {content}
      </Link>
    );
  }

  return content;
};
