import Image from "next/image";
import Link from "next/link";
import { getLocale, getTranslations } from "next-intl/server";
import { PRODUCTS } from "@/lib/types/product";

interface ProductSkeletonProps {
  slug: string;
}

export async function ProductSkeleton({ slug }: ProductSkeletonProps) {
  const t = await getTranslations("product");
  const tProducts = await getTranslations(`products.${slug}`);
  const locale = await getLocale();
  const product = PRODUCTS.find((p) => p.slug === slug);

  return (
    <>
      <section className="relative mt-16 overflow-hidden bg-gradient-to-br from-bg via-bg2 to-bg">
        <div className="mx-auto max-w-[1200px] px-5 py-15 md:px-10 md:py-20">
          <Link
            href={`/${locale}`}
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-text3 no-underline transition-colors hover:text-orange"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            {t("backToHome")}
          </Link>

          <div className="mb-6 flex gap-1">
            <span className="h-1 w-10 rounded-sm bg-orange" />
            <span className="h-1 w-10 rounded-sm bg-orange opacity-70" />
            <span className="h-1 w-10 rounded-sm bg-orange opacity-50" />
            <span className="h-1 w-10 rounded-sm bg-orange opacity-30" />
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-8 md:flex-1">
              <div>
                <h1 className="mb-2 text-[48px] font-extrabold leading-tight tracking-[-1px]">
                  <span className="text-orange">{tProducts("name")}</span>
                </h1>
                <div className="text-base font-normal tracking-[2px] uppercase text-text2">
                  {tProducts("subtitle")}
                </div>
              </div>

              {/* Stats skeleton */}
              <div className="flex gap-4">
                <div className="min-w-[120px] rounded-xl border border-border bg-bg3 px-6 py-4">
                  <div className="h-9 w-16 animate-pulse rounded bg-bg2" />
                  <div className="mt-1 text-[10px] tracking-[1px] uppercase text-text3">
                    {t("vehicles")}
                  </div>
                </div>
                <div className="min-w-[120px] rounded-xl border border-border bg-bg3 px-6 py-4">
                  <div className="h-9 w-12 animate-pulse rounded bg-bg2" />
                  <div className="mt-1 text-[10px] tracking-[1px] uppercase text-text3">
                    {t("brands")}
                  </div>
                </div>
              </div>
            </div>

            {product?.image && (
              <div className="relative h-[220px] w-full overflow-hidden rounded-2xl border border-border bg-bg3 md:w-[45%]">
                <Image
                  src={product.image}
                  alt={tProducts("name")}
                  fill
                  sizes="(max-width: 768px) 100vw, 45vw"
                  className="object-cover"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Compatibility section skeleton */}
      <section className="mx-auto max-w-[1200px] px-5 py-10 md:px-10">
        <div className="mb-6 h-10 w-full animate-pulse rounded-lg bg-bg3" />
        <div className="mb-6 flex gap-2">
          <div className="h-8 w-16 animate-pulse rounded-full bg-bg3" />
          <div className="h-8 w-20 animate-pulse rounded-full bg-bg3" />
          <div className="h-8 w-24 animate-pulse rounded-full bg-bg3" />
          <div className="h-8 w-20 animate-pulse rounded-full bg-bg3" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-12 w-full animate-pulse rounded-md bg-bg3"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      </section>
    </>
  );
}
