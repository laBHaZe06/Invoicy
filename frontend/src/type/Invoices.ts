import { Clients } from "./Clients";
import { InvoiceTemplate } from "./InvoiceTemplate";
import { User } from "./User";

export type Invoices = {
    id: number;
    invoiceNumber: string;
    createdAt: string;
    amountHt: string;
    amountTtc: string;
    description: string;
    statut: string;
    client: Clients;
    user: User;
    template: InvoiceTemplate;
}
