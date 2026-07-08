import type { Metadata } from "next";
import { CustomersPageClient } from "@/components/admin/customers-page-client";
import { getCustomerTierSummary, getCustomersWithStats } from "@/server/queries/dashboard";

export const metadata: Metadata = { title: "Customers" };

export default async function AdminCustomersPage() {
  let customers: Awaited<ReturnType<typeof getCustomersWithStats>> = [];
  let tierSummary: Awaited<ReturnType<typeof getCustomerTierSummary>> = [];

  try {
    [customers, tierSummary] = await Promise.all([
      getCustomersWithStats(),
      getCustomerTierSummary(),
    ]);
  } catch {
    customers = [];
    tierSummary = [];
  }

  return (
    <div>
      <CustomersPageClient customers={customers} tierSummary={tierSummary} />
    </div>
  );
}
