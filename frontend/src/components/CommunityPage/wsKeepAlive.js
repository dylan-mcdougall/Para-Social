export const keepAlive = (ws) => {
    const interval = 20000;
    let intervalId;

    const ping = () => {
        if (ws.readyState) {
            ws.send(JSON.stringify('ping'));
        }
    };

    const startInterval = () => {
        intervalId = setInterval(ping, interval);
    };

    const stopInterval = () => {
        clearInterval(intervalId);
    };

    ws.addEventListener('open', () => {
        startInterval();
    })

    ws.addEventListener('close', () => {
        stopInterval();
    });

    ws.addEventListener('error', () => {
        stopInterval();
    });
}
