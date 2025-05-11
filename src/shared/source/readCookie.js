export const readCookie = (startRead) => {
    return document.cookie
        .split('; ')
        .find(row => row.startsWith(startRead))
        ?.split('=')[1];
};