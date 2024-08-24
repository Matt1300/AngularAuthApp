export interface Customer {
    code: string;
    name: string;
    email: string;
    phone: string;
    creditlimit: number | null;
    isActive: boolean | null;
    taxcode: number | null;
    statusname: string;
}