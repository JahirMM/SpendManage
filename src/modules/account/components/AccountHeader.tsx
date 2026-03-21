"use client";

import EditAccountDialog from "@/src/modules/editAccount/components/EditAccountDialog";
import WarningDialog from "@/src/shared/components/WarningDialog";
import { useDeleteAccount } from "@/src/modules/account/hooks/useDeleteAccount";
import { AccountInterface } from "@/src/modules/dashboard/interfaces/accountInterface";
import { MoveLeft, SquarePen, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

interface AccountHeaderProps {
  account: AccountInterface;
}

function AccountHeader({ account }: AccountHeaderProps) {
  const router = useRouter();
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showWarningDialog, setShowWarningDialog] = useState(false);

  const { mutateAsync: deleteAccount, isPending: isDeleting } =
    useDeleteAccount();

  const toggleEditDialog = () => setShowEditDialog(!showEditDialog);
  const toggleWarningDialog = () => setShowWarningDialog(!showWarningDialog);

  const handleDelete = async () => {
    try {
      await deleteAccount(account.id);
      router.push("/dashboard");
    } catch (error) {
      console.error("Error al eliminar la cuenta:", error);
    }
  };

  return (
    <>
      <header>
        <Link
          href="/dashboard"
          className="flex gap-2 mb-5 text-base font-black text-action"
        >
          <MoveLeft className="size-5" /> Volver
        </Link>
        <div className="flex flex-col gap-4 md:flex-row md:justify-between md:gap-0">
          <div className="space-y-4">
            <div className="flex justify-between">
              <h1 className="text-2xl font-bold lg:text-3xl">{account.title}</h1>
              <div className="flex gap-3 md:hidden">
                <button
                  type="button"
                  aria-label="Editar cuenta"
                  className="p-1 rounded-md transition duration-300 cursor-pointer hover:bg-gray-200/80"
                  onClick={toggleEditDialog}
                >
                  <SquarePen className="size-5" />
                </button>
                <button
                  type="button"
                  aria-label="Eliminar cuenta"
                  className="p-1 rounded-md transition duration-300 cursor-pointer hover:bg-gray-200/80"
                  onClick={toggleWarningDialog}
                >
                  <Trash className="text-red-600 size-5" />
                </button>
              </div>
            </div>
            {account.description && (
              <p className="text-sm">{account.description}</p>
            )}
            <div className="flex gap-3 text-sm">
              <span className="px-4 py-0.5 bg-secondary rounded-2xl">
                {account.type === "credit" ? "Tarjeta" : "Cuenta Normal"}
              </span>
              <span className="text-gray-600">Pago día {account.payment_date}</span>
              {account.closing_date && (
                <span className="text-gray-600">
                  Cierre día {account.closing_date}
                </span>
              )}
            </div>
          </div>
          <div className="hidden gap-3 md:flex md:items-center">
            <button
              type="button"
              aria-label="Editar cuenta"
              className="p-1 rounded-md transition duration-300 cursor-pointer hover:bg-gray-200/80"
              onClick={toggleEditDialog}
            >
              <SquarePen className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Eliminar cuenta"
              className="p-1 rounded-md transition duration-300 cursor-pointer hover:bg-gray-200/80"
              onClick={toggleWarningDialog}
            >
              <Trash className="text-red-600 size-5" />
            </button>
          </div>
        </div>
      </header>
      <EditAccountDialog
        open={showEditDialog}
        setShowEditDialog={setShowEditDialog}
        account={account}
      />
      <WarningDialog
        open={showWarningDialog}
        onOpenChange={toggleWarningDialog}
        title="Eliminar cuenta"
        description="¿Estás seguro de eliminar esta cuenta? Esta acción no se puede deshacer."
        actionLabel={isDeleting ? "Eliminando..." : "Eliminar"}
        onAction={handleDelete}
      />
    </>
  );
}

export default AccountHeader;
