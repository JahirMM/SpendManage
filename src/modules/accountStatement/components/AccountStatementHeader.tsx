function AccountStatementHeader() {
  return (
    <div className="text-white space-y-4 p-3 w-full bg-linear-to-br from-[#023048] to-[#023048]/90 rounded-xl">
      <p className="text-sm text-muted">Cuenta simple</p>
      <h3 className="text-lg font-bold">Tarjeta lider</h3>
      <div className="flex justify-between text-xs sm:text-sm">
        <div>
          <p className="text-muted">Periodo</p>
          <p>Diciembre 2025</p>
        </div>
        <div>
          <p className="text-muted">Fecha de pago</p>
          <p>Día 5</p>
        </div>
      </div>
    </div>
  );
}

export default AccountStatementHeader;
