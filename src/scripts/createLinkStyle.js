//Create a link node for styles.
export function createLinkStyle(url){
    const link = document.createElement('link');
        
        link.rel = 'stylesheet';
        link.href = `${url}`;
        link.type = 'text/css';

        document.head.appendChild(link);
}