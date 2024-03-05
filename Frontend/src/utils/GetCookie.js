export default function GetCookie() {
    const cookies = document.cookie;
    const cookieName = 'access_token'; 
    const cookieArray = cookies.split('; ');
    const isCookieFound = cookieArray.find(cookie => cookie.trim().startsWith(`${cookieName}=`));

    if (isCookieFound) {
        return isCookieFound;
    }
    return false;
};
