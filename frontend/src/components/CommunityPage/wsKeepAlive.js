export const keepAlive = (ws) => {
    const interval = 20000;

    const ping = () => {
        if (ws.readyState) {
            ws.send(JSON.stringify('ping'));
        }
    };

    const intervalId = setInterval(ping, interval);

    ws.addEventListener('close', () => {
        clearInterval(intervalId);
    });

    ws.addEventListener('error', () => {
        clearInterval(intervalId);
    });
}
