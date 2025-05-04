export type InvoiceTemplate = {
    id: number;
    name: string;
    description: string;
    logo: string;
    htmlContent: string;
    isDefault: boolean;
    styleConfig: string;
    Owner: number | null;
    user: {
        firstName: string;
        lastName: string;
        username: string;
        role: string;
        status: string;
        siren: string;
        siret: string;
        num_crs: string;
        capital_social: string;
        createdAt: string;
        updatedAt: string;
    };
}
