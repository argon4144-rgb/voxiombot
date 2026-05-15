
const WebSocket = require('ws');

// --- [ 1. CONFIGURATION VARIABLES ] ---
const TOTAL_BOTS      = 30;    // How many soldiers to deploy
const SESSION_LENGTH  = 600; // How long they stay (in milliseconds). 60000 = 1 minute.
const REJOIN_DELAY    = 0;  // How long to wait before rejoining after leaving (5 seconds)
const DEPLOY_SPACING  = 0;   // Delay between each bot joining to prevent server kicks

// --- [ 2. GAME DATA ] ---
const SERVER_URL      = 'wss://game-server-pq9mc.voxiom.io'; 
const JOIN_HEX        = '0387010205';
const BASE_HEX        = '00000022e03fcd35ddbfc90fdb460b28007f7f0000';
const SELECT_4_HEX    = '0000001466bf0320cbbf812dfb45a3135e7f7f010003';
const TICK_RATE       = 60; 

function deploySoldier(id) {
    console.log(`[*] Soldier #${id} preparing for deployment...`);
    
    const ws = new WebSocket(SERVER_URL, {
        headers: { 'Origin': 'https://voxiom.io' }
    });

    let toggle = false;
    let brain;
    let sessionTimer;

    ws.on('open', () => {
        ws.send('40'); 

        setTimeout(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(Buffer.from(JOIN_HEX, 'hex'));
                console.log(`[+] Soldier #${id} DEPLOYED. Stay time: ${SESSION_LENGTH / 1000}s`);

                // Force slot 4
                ws.send(Buffer.from(SELECT_4_HEX, 'hex'));

                // ACTION LOOP (Jumping & Placing)
                brain = setInterval(() => {
                    if (ws.readyState === WebSocket.OPEN) {
                        let packet = toggle ? BASE_HEX.slice(0, -1) + "2" : BASE_HEX.slice(0, -1) + "3";
                        ws.send(Buffer.from(packet, 'hex'));
                        ws.send(Buffer.from(SELECT_4_HEX, 'hex'));
                        toggle = !toggle;
                    }
                }, TICK_RATE);

                // SESSION TIMER (When they leave)
                sessionTimer = setTimeout(() => {
                    console.log(`[!] Soldier #${id} session expired. Leaving...`);
                    ws.close();
                }, SESSION_LENGTH);
            }
        }, 1200);
    });

    ws.on('close', () => {
        // Clean up loops
        clearInterval(brain);
        clearTimeout(sessionTimer);
        
        // REJOIN LOGIC
        console.log(`[-] Soldier #${id} disconnected. Rejoining in ${REJOIN_DELAY / 1000}s...`);
        setTimeout(() => deploySoldier(id), REJOIN_DELAY);
    });

    ws.on('error', () => {});
}

// --- [ 3. START THE FACTORY ] ---
console.log(`Starting Soldier Factory...`);
for (let i = 1; i <= TOTAL_BOTS; i++) {
    setTimeout(() => deploySoldier(i), i * DEPLOY_SPACING);
}
