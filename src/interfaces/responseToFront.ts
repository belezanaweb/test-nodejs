interface ResponseToFront{
    status: number,
    body: BodyResponse
}

interface BodyResponse{
    status?: number,
    message?: string,
    log?: Object
}