export interface Domain {
    domain_id: string;
    domain_url: string;
    domain_type: string;
    domain_created_date: Date;
    attributes: {
        is_webshop: string;
        phoneNumbers: Record<string, string>;
        emailAddresses: Record<string, string>;
        companyNames: Record<string, string>;
        defaultHostingPage: Record<string, string>;
        [key: string]: string;
    };
}
