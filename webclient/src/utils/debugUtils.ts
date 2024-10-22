const params = new URLSearchParams(window.location.search)

export const debugEnabled = !!params.get("debug")
