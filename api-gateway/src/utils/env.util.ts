const getEnv = (key: string, required = true): string => {
    const value = process.env[key];
    if(required && !value){
        throw new Error(`Environment variable ${key} is required but not set. `);
    }

    return value as string;
}

export { getEnv }