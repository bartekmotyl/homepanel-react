
export const toNumber = (val: any): number | null => {
    if (val === undefined) {
        return null 
    }
    if (val === null) {
        return null 
    }
    const n = Number(val)
    if (isNaN(n)) {
        return null
    }
    return n
} 