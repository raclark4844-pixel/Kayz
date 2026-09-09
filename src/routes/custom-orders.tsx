import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/custom-orders")({
  beforeLoad: () => {
    throw redirect({ href: "/custom" });
  },
});
