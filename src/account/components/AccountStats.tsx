import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AccountStats() {
  return (
    <section aria-label="" className="space-y-3">
      <Card className="border-none bg-primary">
        <CardHeader>
          <CardTitle className="text-sm font-bold text-muted">
            Deuda total
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-1">
          <span className="text-base font-bold text-white">$</span>
          <span className="text-2xl font-bold text-white">3000.000,00</span>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold text-muted">
              Pago de este mes
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-1">
            <span className="text-sm font-bold">$</span>
            <span className="text-lg font-bold">92.350,00</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold text-muted">
              Movimientos activos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-bold">23</CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-bold text-muted">
              Movimientos completos
            </CardTitle>
          </CardHeader>
          <CardContent className="text-lg font-bold">0</CardContent>
        </Card>
      </div>
    </section>
  );
}

export default AccountStats;
