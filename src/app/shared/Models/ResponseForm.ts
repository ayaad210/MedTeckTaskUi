export interface ApiResponse<T> {
    mesasageId: number;
    mesasage: string;
    data: T[];
}