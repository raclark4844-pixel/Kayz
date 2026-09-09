import { createRootRoute, HeadContent, Outlet, Scripts, redirect, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { Toaster } from "sonner";
import { BottomNav } from "@/components/bottom-nav";
import { CartDrawer } from "@/components/cart-drawer";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ProductStudio } from "@/components/product-editor";
import { JsonLd } from "@/components/json-ld";
import { AuthProvider } from "@/lib/auth/provider";
import { useCart } from "@/lib/cart";
import { useShop } from "@/lib/shop-store";
import { cn } from "@/lib/utils";
import { canonicalRedirectUrl } from "@/lib/canonical-host";
import { gaId, organizationJsonLd, pageHead, SITE_DESCRIPTION, SITE_TITLE } from "@/lib/seo";
import appCss from "../styles.css?url";

function CartHydrate() {
  const setHydrated = useCart((s) => s.setHydrated);
  const hydrateShop = useShop((s) => s.hydrate);
  useEffect(() => {
    setHydrated();
    void hydrateShop();
  }, [setHydrated, hydrateShop]);
  return null;
}

function AppFrame() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const isHome = pathname === "/";
  return (
    <>
      <CartHydrate />
      <SiteHeader />
      <div className={cn("pb-nav lg:pb-0", !isHome && "pt-16 sm:pt-[4.25rem]")}>
        <Outlet />
        <SiteFooter />
      </div>
      <BottomNav />
      <CartDrawer />
      <ProductStudio />
      <Toaster
        theme="dark"
        position="top-center"
        toastOptions={{
          style: {
            background: "#121110",
            border: "1px solid rgba(212,175,55,0.28)",
            color: "#f4ead8",
          },
        }}
      />
    </>
  );
}

export const Route = createRootRoute({
  beforeLoad: async () => {
    if (typeof window !== "undefined") return;
    try {
      const { getRequest } = await import("@tanstack/react-start/server");
      const request = getRequest();
      const forwarded = request.headers.get("x-forwarded-host");
      const host = (forwarded || request.headers.get("host") || "").split(":")[0];
      const proto = request.headers.get("x-forwarded-proto") || "https";
      const path = new URL(request.url).pathname + new URL(request.url).search;
      const dest = canonicalRedirectUrl(`${proto}://${host}${path}`);
      if (dest) throw redirect({ href: dest });
    } catch (err) {
      if (err && typeof err === "object" && "href" in err) throw err;
    }
  },
  head: () => {
    const seo = pageHead({
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
      path: "/",
    });
    const id = gaId();
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "theme-color", content: "#0a0a0a" },
        ...seo.meta,
      ],
      links: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "stylesheet", href: appCss },
        { rel: "manifest", href: "/__grok/manifest.webmanifest" },
        { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossOrigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Outfit:wght@300;400;500;600&display=swap",
        },
        ...seo.links,
      ],
      scripts: id
        ? [
            { src: `https://www.googletagmanager.com/gtag/js?id=${id}`, async: true },
            {
              children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${id}');`,
            },
          ]
        : [],
    };
  },
  component: RootDocument,
});

function RootDocument() {
  return (
    <html lang="en" suppressHydrationWarning className="antialiased">
      <head>
        <HeadContent />
        <JsonLd data={organizationJsonLd} />
      </head>
      <body className="bg-background text-foreground">
        <PreviewHostBridge />
        <AuthProvider>
          <AppFrame />
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
