"use client";

import { useLocale, useTranslations } from "next-intl";

interface ProductSpecsProps {
  slug: string;
}

/**
 * Compact HKS/TRD-style spec band — tagline + 4 numbers + small CTA.
 * Kept short so the compatibility table stays above the fold.
 * Currently only rendered for stfilter.
 */
export function ProductSpecs({ slug }: ProductSpecsProps) {
  const locale = useLocale();
  const isZh = locale.startsWith("zh");
  const t = useTranslations("productSpecs");
  const tProduct = useTranslations("productSpecs.stfilter");

  if (slug !== "stfilter") return null;

  const specs = [
    { value: tProduct("spec1Value"), label: tProduct("spec1Label"), sub: tProduct("spec1Sub") },
    { value: tProduct("spec2Value"), label: tProduct("spec2Label"), sub: tProduct("spec2Sub") },
    { value: tProduct("spec3Value"), label: tProduct("spec3Label"), sub: tProduct("spec3Sub") },
    { value: tProduct("spec4Value"), label: tProduct("spec4Label"), sub: tProduct("spec4Sub") },
  ];

  return (
    <section className="relative border-b border-border bg-bg">
      <div className="mx-auto max-w-[1440px] px-6 py-8 md:px-12 md:py-10">
        {/* Tagline row — eyebrow + slogan inline */}
        <div className="mb-5 flex flex-wrap items-center gap-x-5 gap-y-2">
          <div className="flex items-center gap-2.5 font-brand text-[10px] font-black tracking-[3px] text-text3 uppercase">
            <span className="inline-block h-px w-8 bg-border" />
            <span>{tProduct("eyebrow")}</span>
          </div>
          <div
            className={`font-display text-[16px] md:text-[20px] leading-tight font-black tracking-[-0.3px] uppercase text-orange ${isZh ? "zh" : ""}`}
          >
            {tProduct("tagline")}
          </div>
        </div>

        {/* 4-cell stat strip */}
        <div className="grid grid-cols-2 gap-px border border-border bg-border md:grid-cols-4">
          {specs.map((s, i) => (
            <div key={i} className="relative bg-bg px-4 py-5 md:px-6 md:py-6">
              <span className="absolute top-0 left-0 h-px w-6 bg-orange" />
              <div className="font-brand text-[32px] md:text-[40px] font-black leading-none tracking-[-1px] text-orange">
                {s.value}
              </div>
              <div
                className={`mt-2.5 flex flex-wrap items-baseline gap-x-2 ${isZh ? "zh" : ""}`}
              >
                <span className="font-brand text-[10px] font-black tracking-[1.5px] uppercase text-text">
                  {s.label}
                </span>
                {s.sub && (
                  <span className="text-[10px] tracking-[0.3px] text-text3">
                    {s.sub}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom row — data source + CTA */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div
            className={`font-mono text-[10px] tracking-[1px] uppercase text-text3 ${isZh ? "zh" : ""}`}
          >
            {tProduct("dataSource")}
          </div>
          <a
            href="https://www.shadowmotor.com.tw/zh-TW/product/ST-Filter-High-Flow-Intake.html"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-brand text-[10px] font-black tracking-[2px] uppercase text-orange no-underline transition-all hover:text-orange-hover"
          >
            <span className={isZh ? "zh" : ""}>{t("ctaLearnMore")}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="m7 17 10-10M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
