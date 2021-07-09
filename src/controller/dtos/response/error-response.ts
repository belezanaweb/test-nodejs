export interface BadRequestResponse {
    location: string;
    field: string;
    errorMessage: string;
}

export interface GenericErrorResponse {
    errorMessage: string;
    path: string;
}