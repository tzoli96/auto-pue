import { ColumnDef } from "@tanstack/react-table";
import { Domains } from "../types/domain";
import { DropdownMenuActions } from "../components/DropdownMenuActions.tsx";

export const columns: ColumnDef<Domains>[] = [
    {
        accessorKey: "domain_url",
        header: "Domain URL",
    },
    {
        accessorKey: "domain_type",
        header: "Domain Type",
    },
    {
        accessorKey: "domain_created_date",
        header: "Domain Created",
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            const domainId = row.original.domain_id;
            return <DropdownMenuActions domainId={domainId} />;
        },
    },
];
