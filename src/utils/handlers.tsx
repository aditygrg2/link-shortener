export function handleMinimumTime() : string {
    return new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"))
}