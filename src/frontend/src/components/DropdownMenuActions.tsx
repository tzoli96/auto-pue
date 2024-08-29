import React from 'react';
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { resynchronizeDomainById, verifyWebshopSyncById } from '../services/domainServices.ts';
import { useToast } from "@/components/ui/use-toast";  // Importáljuk a useToast hookot

interface DropdownMenuActionsProps {
    domainId: string;
}

export const DropdownMenuActions: React.FC<DropdownMenuActionsProps> = ({ domainId }) => {
    const { toast } = useToast();

    const handleVerifyWebshopSync = async () => {
        try {
            await verifyWebshopSyncById(domainId);
            toast({
                title: `Webshop synchronization for domain ${domainId} verified successfully!`,
                status: 'success',
            });
        } catch (error) {
            console.error(`Error verifying webshop sync for domain ${domainId}:`, error);
            toast({
                variant: "destructive",
                title: 'Verification failed',
                description: `Error verifying webshop sync for domain ${domainId}.`,
                status: 'error',
            });
        }
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={handleVerifyWebshopSync}>
                    Verify Webshop Synchronization
                </DropdownMenuItem>
                <DropdownMenuSeparator />
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
