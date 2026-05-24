import { CardsSection } from "./_components/cards-section";
import { ChartAreaInteractive } from "./_components/chart-area-interactive";

export default function DashboardPage() {
  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
          <CardsSection />

          <div className="px-4 lg:px-6">
            <ChartAreaInteractive />
          </div>

          {/* <DataTable data={data} /> */}
        </div>
      </div>
    </div>
  );
}
