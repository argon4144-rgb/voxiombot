// const WebSocket = require('ws');

// // --- SETTINGS (Change these only) ---
// const SERVER_URL = 'wss://game-server-CABbs.voxiom.io/'; 
// const JOIN_HEX   = '0387010205';

// const TOTAL_BOTS    = 20;    // Number of soldiers to spawn
// const DEPLOY_GAP    = 100;  // Wait 1 second between each new soldier joining
// const STAY_DURATION = 5000; // How long (ms) a bot stays in game before leaving (20s)
// const RESTART_DELAY = 100;  // How long (ms) to wait before a bot rejoins (2s)
// // ------------------------------------

// function deploySoldier(id) {
//     const ws = new WebSocket(SERVER_URL, {
//         headers: { 'Origin': 'https://voxiom.io' }
//     });

//     ws.on('open', () => {
//         // Step 1: Standard Socket.io handshake
//         ws.send('40'); 






//         // Step 2: Join after a half-second delay
//         setTimeout(() => {
//             if (ws.readyState === WebSocket.OPEN) {
//                 ws.send(Buffer.from(JOIN_HEX, 'hex'));
//                 console.log(`[+] [${new Date().toLocaleTimeString()}] Soldier #${id} DEPLOYED`);
//             }
//         }, 500);

//         // Step 3: Auto-Leave based on STAY_DURATION constant
//         setTimeout(() => {
//             if (ws.readyState === WebSocket.OPEN) {
//                 console.log(`[-] [${new Date().toLocaleTimeString()}] Soldier #${id} RETREATING`);
//                 ws.close();
//             }
//         }, STAY_DURATION);
//     });

//     ws.on('close', () => {
//         // Step 4: Restart based on RESTART_DELAY constant
//         setTimeout(() => deploySoldier(id), RESTART_DELAY);
//     });

//     ws.on('error', (err) => {
//         // If the URL/SID expires, you will see it here
//         console.log(`[!] Soldier #${id} Error: Check if SID is expired.`);
//     });
// }

// // Start the factory
// console.log(`Starting experiment with ${TOTAL_BOTS} soldiers...`);
// for (let i = 1; i <= TOTAL_BOTS; i++) {
//     setTimeout(() => deploySoldier(i), i * DEPLOY_GAP);
// }




// const WebSocket = require('ws');

// // --- 1. CONFIGURATION ---
// const SERVER_URL = 'wss://game-server-IE4Sm.voxiom.io'; 
// const JOIN_HEX   = '0387010205';

// // --- 2. YOUR PACKETS ---
// // The "Look at feet" packet you found
// const LOOK_DOWN_HEX = '00000022e03fcd35ddbfc90fdb460b28007f7f0000'; 
// // The "Jump" packet (ending in 01)
// const JUMP_HEX      = '00000023f5c0430dbcbddd400d460f88bf7f7f0001'; 
// // The "Standing still" packet (ending in 00)
// const IDLE_HEX      = '00000023efc0430dbcbddd400d460f6f047f7f0000';

// const TOTAL_BOTS = 15;
// const JUMP_SPEED = 60; // 60ms for a very fast, smooth jump

// function deploySoldier(id) {
//     const ws = new WebSocket(SERVER_URL, {
//         headers: { 'Origin': 'https://voxiom.io' }
//     });

//     ws.on('open', () => {
//         ws.send('40'); // Handshake

//         setTimeout(() => {
//             if (ws.readyState === WebSocket.OPEN) {
//                 ws.send(Buffer.from(JOIN_HEX, 'hex'));
//                 console.log(`[+] Soldier #${id} deployed: Jumping & Looking at feet`);

//                 // --- ACTION LOOP ---
//                 const brain = setInterval(() => {
//                     if (ws.readyState === WebSocket.OPEN) {
                        
//                         const BASE_HEX = '00000022e03fcd35ddbfc90fdb460b28007f7f0000';

//                         let jumpToggle = false;

//                         const actionLoop = setInterval(() => {
//                             if (ws.readyState === WebSocket.OPEN) {
                                
//                                 // We take your Base Hex and only change the VERY LAST digit
//                                 // This keeps the camera LOCKED at the feet and only toggles the JUMP
                                
//                                 let packet;
//                                 if (!jumpToggle) {
//                                     // JUMP ON: Change last digit to 1
//                                     packet = BASE_HEX.slice(0, -1) + "1"; 
//                                 } else {
//                                     // JUMP OFF (IDLE): Keep last digit at 0
//                                     packet = BASE_HEX.slice(0, -1) + "0";
//                                 }

//                                 ws.send(Buffer.from(packet, 'hex'));
                                
//                                 // Switch the toggle for the next 50ms tick
//                                 jumpToggle = !jumpToggle; 
//                             }
//                         }, 50); // 50ms = Super fast, non-stop jumping

//                     } else {
//                         clearInterval(brain);
//                     }
//                 }, JUMP_SPEED);
//             }
//         }, 1000);
//     });

//     ws.on('close', () => {
//         setTimeout(() => deploySoldier(id), 2000); // Auto-restart if they leave
//     });

//     ws.on('error', (err) => console.log(`Soldier ${id} Error: ${err.message}`));
// }

// // Start the Factory
// console.log(`Deploying ${TOTAL_BOTS} soldiers...`);
// for (let i = 1; i <= TOTAL_BOTS; i++) {
//     setTimeout(() => deploySoldier(i), i * 1000);
// }










// const WebSocket = require('ws');

// // --- SETTINGS (Adjust these) ---
// const SERVER_URL    = 'wss://game-server-X8ftU.voxiom.io'; 
// const JOIN_HEX      = '0387010205'; // Must be fresh from your Network tab combat+mag = 

// const TOTAL_BOTS     = 20;    // Number of bots to spawn
// const STAY_DURATION  = 10000; // How long (ms) bots stay in game (e.g., 30s)
// const RESTART_DELAY  = 100;  // Delay (ms) before a bot rejoins after leaving
// const DEPLOY_GAP     = 100;  // Delay (ms) between each bot joining
// const JUMP_SPEED     = 40;   // How fast to toggle the jump (ms)

// // --- JUMP PACKET ---
// // Ensure this hex is a valid movement packet from your game session
// const JUMP_HEX = '00000023f5c0430dbcbddd400d460f88bf7f7f0001'; 

// function deploySoldier(id) {
//     const ws = new WebSocket(SERVER_URL, {
//         headers: { 'Origin': 'https://voxiom.io' }
//     });

//     let jumpInterval;

//     ws.on('open', () => {
//         ws.send('40'); // Socket.io handshake

//         setTimeout(() => {
//             if (ws.readyState === WebSocket.OPEN) {
//                 ws.send(Buffer.from(JOIN_HEX, 'hex'));
//                 console.log(`[+] Soldier #${id} DEPLOYED: Starting Jump Loop`);

//                 // --- JUMP ONLY LOOP ---
//                 jumpInterval = setInterval(() => {
//                     if (ws.readyState === WebSocket.OPEN) {
//                         ws.send(Buffer.from(JUMP_HEX, 'hex'));
//                     }
//                 }, JUMP_SPEED);
//             }
//         }, 1000);

//         // STAY DURATION: Bots leave after this amount of time
//         setTimeout(() => {
//             if (ws.readyState === WebSocket.OPEN) {
//                 console.log(`[-] Soldier #${id} STAY_DURATION reached. Leaving...`);
//                 ws.close();
//             }
//         }, STAY_DURATION);
//     });

//     ws.on('close', () => {
//         clearInterval(jumpInterval);
//         // RESTART DELAY: How long to wait before looping back in
//         setTimeout(() => deploySoldier(id), RESTART_DELAY);
//     });

//     ws.on('error', (err) => {
//         clearInterval(jumpInterval);
//         console.log(`[!] Soldier #${id} Error: ${err.message}`);
//     });
// }

// // Start the Factory
// console.log(`Starting experiment: ${TOTAL_BOTS} bots | Stay: ${STAY_DURATION}ms | Restart: ${RESTART_DELAY}ms`);
// for (let i = 1; i <= TOTAL_BOTS; i++) {
//     setTimeout(() => deploySoldier(i), i * DEPLOY_GAP);
// }








const WebSocket = require('ws');

// --- GUN CONSTANTS (JOIN PACKETS) ---
const GUNS = {
    COMBAT:   '0387010205', // Combat Assault Rifle + Magnum
    SHOTGUN:  '0387050205', // Shotgun
    TACTICAL: '',           // Fill these as you find them
    SURGE:    '',           
    ELITE:    '',           
    LSMG:     '',           
    CSMG:     '',           
    LSR:      '',           
    HSR:      ''            
};

// --- SETTINGS (Adjust these) ---
const SERVER_URL    = 'wss://game-server-pQ9Mc.voxiom.io'; 
const JOIN_HEX      = GUNS.SHOTGUN; // Simply change this to GUNS.COMBAT or others

const TOTAL_BOTS     = 20;    // Number of bots to spawn
const STAY_DURATION  = 3000; // How long (ms) bots stay in game (e.g., 30s)
const RESTART_DELAY  = 100;   // Delay (ms) before a bot rejoins after leaving
const DEPLOY_GAP     = 100;   // Delay (ms) between each bot joining
const JUMP_SPEED     = 40;    // How fast to toggle the jump (ms)

// --- JUMP PACKET ---
const JUMP_HEX = '00000023f5c0430dbcbddd400d460f88bf7f7f0001'; 

function deploySoldier(id) {
    const ws = new WebSocket(SERVER_URL, {
        headers: { 'Origin': 'https://voxiom.io' }
    });

    let jumpInterval;

    ws.on('open', () => {
        ws.send('40'); // Socket.io handshake

        setTimeout(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(Buffer.from(JOIN_HEX, 'hex'));
                console.log(`[+] Soldier #${id} DEPLOYED: Starting Jump Loop`);

                // --- JUMP ONLY LOOP ---
                jumpInterval = setInterval(() => {
                    if (ws.readyState === WebSocket.OPEN) {
                        ws.send(Buffer.from(JUMP_HEX, 'hex'));
                    }
                }, JUMP_SPEED);
            }
        }, 1000);

        // STAY DURATION: Bots leave after this amount of time
        setTimeout(() => {
            if (ws.readyState === WebSocket.OPEN) {
                console.log(`[-] Soldier #${id} STAY_DURATION reached. Leaving...`);
                ws.close();
            }
        }, STAY_DURATION);
    });

    ws.on('close', () => {
        clearInterval(jumpInterval);
        // RESTART DELAY: How long to wait before looping back in
        setTimeout(() => deploySoldier(id), RESTART_DELAY);
    });

    ws.on('error', (err) => {
        clearInterval(jumpInterval);
        console.log(`[!] Soldier #${id} Error: ${err.message}`);
    });
}

// Start the Factory
console.log(`Starting experiment: ${TOTAL_BOTS} bots | Stay: ${STAY_DURATION}ms | Restart: ${RESTART_DELAY}ms`);
for (let i = 1; i <= TOTAL_BOTS; i++) {
    setTimeout(() => deploySoldier(i), i * DEPLOY_GAP);
}