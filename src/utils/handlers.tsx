export function handleMinimumTime() : string {
    return new Date().toISOString().slice(0,new Date().toISOString().lastIndexOf(":"))
}

export function handleCustomURLError(customURL: string, isURLFound: boolean): string {
    let errorMessage = '';

    if(!customURL.length){ 
        return errorMessage;
    }

    if(!customURL.match(RegExp(/(a-zA-Z0-9)+/))){
        errorMessage = 'Incorrect Pattern';
    }

    if(isURLFound){
        errorMessage = 'Custom URL not available!';
    }

    return errorMessage;
}

export function isPasswordPatternValid(password: string): boolean {
    return password.match(RegExp(/.{6,100}$/))!== null;
}