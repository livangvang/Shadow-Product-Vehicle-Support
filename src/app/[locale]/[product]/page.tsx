import { Suspense } from "react";
import { setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { PRODUCT_SLUGS } from "@/lib/types/product";
import { ProductContent } from "@/components/product/ProductContent";
import { ProductSkeleton } from "@/components/product/ProductSkeleton";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; product: string }>;
}) {
  const { locale, product } = await params;
  const t = await getTranslations({ locale, namespace: `products.${product}` });

  return {
    title: `Shadow Performance — ${t("name")} Compatibility List`,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; product: string }>;
}) {
  const { locale, product } = await params;
  setRequestLocale(locale);

  if (!PRODUCT_SLUGS.includes(product as typeof PRODUCT_SLUGS[number])) {
    notFound();
  }

  return (
    <main>
      <Suspense fallback={<ProductSkeleton slug={product} />}>
        <ProductContent product={product} />
      </Suspense>
    </main>
  );
}
