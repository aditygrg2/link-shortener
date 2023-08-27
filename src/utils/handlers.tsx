import { idText } from "typescript"

export function handleMinimumTime() : string {
    return new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"))
}

export function handleCustomURLError(customURL: string, isURLFound: boolean): string {
    let errorMessage = '';

    if(!customURL.length){ 
        return errorMessage;
    }

    if(!customURL.match(RegExp(/\w+/))){
        errorMessage = 'Incorrect Pattern';
    }

    if(isURLFound){
        errorMessage = 'Custom URL not available!';
    }

    return errorMessage;
}