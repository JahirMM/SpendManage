import { Card, CardHeader, CardTitle } from "@/components/ui/card";

function AccountChart() {
  return (
    <section aria-label="Gastos total del mes actual y anteriores">
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="text-base font-bold text-primary">
            Gastos totales último meses
          </CardTitle>
        </CardHeader>
      </Card>
    </section>
  );
}

export default AccountChart;
