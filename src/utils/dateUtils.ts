export function formatDate(date: Date, format: string): string {
    const pad = (n: number): string => n < 10 ? `0${n}` : `${n}`;
    
    const tokens: { [key: string]: string } = {
        'YYYY': date.getFullYear().toString(),
        'MM': pad(date.getMonth() + 1),
        'DD': pad(date.getDate()),
        'HH': pad(date.getHours()),
        'mm': pad(date.getMinutes()),
        'ss': pad(date.getSeconds())
    };

    return Object.entries(tokens).reduce(
        (result, [token, value]) => result.replace(token, value),
        format
    );
}