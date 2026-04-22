import { getProductData, getSTFilterData } from "@/lib/queries/products";
import { StatsHeader } from "./StatsHeader";
import { CompatibilityClient } from "./CompatibilityClient";

interface ProductContentProps {
  product: string;
}

export async function ProductContent({ product }: ProductContentProps) {
  const isSTFilter = product === "stfilter";

  if (isSTFilter) {
    const groupedData = await getSTFilterData();
    const stats = {
      vehicleCount: Object.values(groupedData).reduce((sum, arr) => sum + arr.length, 0),
      brandCount: Object.keys(groupedData).length,
    };
    return (
      <>
        <StatsHeader slug={product} stats={stats} />
        <CompatibilityClient groupedData={groupedData} slug="stfilter" />
      </>
    );
  }

  const groupedData = await getProductData(product);
  const stats = {
    vehicleCount: Object.values(groupedData).reduce((sum, arr) => sum + arr.length, 0),
    brandCount: Object.keys(groupedData).length,
  };
  return (
    <>
      <StatsHeader slug={product} stats={stats} />
      <CompatibilityClient groupedData={groupedData} slug={product} />
    </>
  );
}
