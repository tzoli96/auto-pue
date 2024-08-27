import { ColumnDef } from "@tanstack/react-table";
import { Domains } from "../types/domain";
import { DropdownMenuActions } from "../components/DropdownMenuActions.tsx";

export const columns: ColumnDef<Domains>[] = [
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "amount",
        header: "Amount",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const domainId = row.original.id;
            return <DropdownMenuActions domainId={domainId} />;
        },
    },
];
