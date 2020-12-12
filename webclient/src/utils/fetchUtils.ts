export const fetchJsonAsync = async <T>(url: string): Promise<T> => (await fetch(url)).json()
export const fetchTextAsync = async (url: string): Promise<string> => (await fetch(url)).text()