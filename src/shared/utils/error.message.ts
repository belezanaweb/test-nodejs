export function alreadyExists(resource: string): string {
    return `${resource}-already-exists`;
}

export function notFound(resource: string): string {
    return `${resource}-not-found`;
}