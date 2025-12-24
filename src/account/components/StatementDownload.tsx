import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function StatementDownload() {
  return (
    <section aria-label="Descargar estado de cuentas" className="mt-5">
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-bold text-primary">
            Descargar estado de cuentas
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Seleccionar fecha" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="diciembre">Diciembre</SelectItem>
              <SelectItem value="noviembre">Noviembre</SelectItem>
              <SelectItem value="octubre">Octubre</SelectItem>
            </SelectContent>
          </Select>
          <Button type="button" size="default" variant="default">
            Descargar
          </Button>
        </CardContent>
      </Card>
    </section>
  );
}

export default StatementDownload;
