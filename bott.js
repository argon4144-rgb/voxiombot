const WebSocket = require('ws');

// --- GUN CONSTANTS (JOIN PACKETS) ---
const GUNS = {
    COMBAT:   '0387010205', // Combat Assault Rifle + Magnum
    SHOTGUN:  '0387050205', // Shotgun
    TACTICAL: '',           
    SURGE:    '',           
    ELITE:    '',           
    LSMG:     '',           
    CSMG:     '',           
    LSR:      '',           
    HSR:      ''            
};


// ctg-asia: OSC2E

// ffa-asia: VdmVM, IE4Sm
// ffa-eu: pQ9Mc, BI1EU, 8HtM2, ziwde
// ffa-east: gcmeE




// --- SETTINGS (Adjust these) ---
const SERVER_URL    = 'wss://game-server-ziwde.voxiom.io'; 
const JOIN_HEX      = GUNS.SHOTGUN; 

const TOTAL_BOTS     = 40;    // Number of bots to spawn
const STAY_DURATION  = 2000;  // How long (ms) bots stay in game
const RESTART_DELAY  = 60;   // Delay (ms) before a bot rejoins after leaving
const DEPLOY_GAP     = 60;   // Delay (ms) between each bot joining
const JUMP_SPEED     = 40;    // Kept from original script

// --- PACKETS ---
const JUMP_HEX    = '00000023f5c0430dbcbddd400d460f88bf7f7f0001'; 
const FORWARD_HEX = '0000000247bfd482aebe4b890d440ff78c7f7f0002'; 
const STOP_HEX    = '0000000247bfd482aebe4b890d440ff78c7f7f0000';

function deploySoldier(id) {
    const ws = new WebSocket(SERVER_URL, {
        headers: { 'Origin': 'https://voxiom.io' }
    });

    let moveInterval;

    ws.on('open', () => {
        ws.send('40'); // Socket.io handshake

        setTimeout(() => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(Buffer.from(JOIN_HEX, 'hex'));
                console.log(`[+] Soldier #${id} DEPLOYED`);

                // Start the fast nudge to unblock spawn point
                setTimeout(() => {
                    if (ws.readyState === WebSocket.OPEN) {
                        console.log(`[->] Soldier #${id} MOVING FORWARD: Clearing spawn area`);
                        
                        moveInterval = setInterval(() => {
                            if (ws.readyState === WebSocket.OPEN) {
                                ws.send(Buffer.from(FORWARD_HEX, 'hex'));
                            }
                        }, 20); // Sending fast to ensure collision unblocks

                        // Stop moving after 300ms
                        setTimeout(() => {
                            clearInterval(moveInterval);
                            if (ws.readyState === WebSocket.OPEN) {
                                ws.send(Buffer.from(STOP_HEX, 'hex'));
                                console.log(`[!] Soldier #${id} STOPPED: Position secured`);
                            }
                        }, 300);
                    }
                }, 200); 
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
        clearInterval(moveInterval);
        // RESTART DELAY: How long to wait before looping back in
        setTimeout(() => deploySoldier(id), RESTART_DELAY);
    });

    ws.on('error', (err) => {
        clearInterval(moveInterval);
        console.log(`[!] Soldier #${id} Error: ${err.message}`);
    });
}

// Start the Factory
console.log(`Starting High-Speed Spawn: ${TOTAL_BOTS} bots | Stay: ${STAY_DURATION}ms | Restart: ${RESTART_DELAY}ms`);
for (let i = 1; i <= TOTAL_BOTS; i++) {
    setTimeout(() => deploySoldier(i), i * DEPLOY_GAP);
}









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








// const WebSocket = require('ws');

// // --- GUN CONSTANTS (JOIN PACKETS) ---
// const GUNS = {
//     COMBAT:   '0387010205', // Combat Assault Rifle + Magnum
//     SHOTGUN:  '0387050205', // Shotgun
//     TACTICAL: '',           // Fill these as you find them
//     SURGE:    '',           
//     ELITE:    '',           
//     LSMG:     '',           
//     CSMG:     '',           
//     LSR:      '',           
//     HSR:      ''            
// };

// // --- SETTINGS (Adjust these) ---
// const SERVER_URL    = 'wss://game-server-pQ9Mc.voxiom.io'; 
// const JOIN_HEX      = GUNS.SHOTGUN; // Simply change this to GUNS.COMBAT or others

// const TOTAL_BOTS     = 20;    // Number of bots to spawn
// const STAY_DURATION  = 3000; // How long (ms) bots stay in game (e.g., 30s)
// const RESTART_DELAY  = 100;   // Delay (ms) before a bot rejoins after leaving
// const DEPLOY_GAP     = 100;   // Delay (ms) between each bot joining
// const JUMP_SPEED     = 40;    // How fast to toggle the jump (ms)

// // --- JUMP PACKET ---
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













// const WebSocket = require('ws');

// // --- [ 1. CONFIGURATION VARIABLES ] ---
// const TOTAL_BOTS      = 40;    // How many soldiers to deploy
// const SESSION_LENGTH  = 600; // How long they stay (in milliseconds). 60000 = 1 minute.
// const REJOIN_DELAY    = 1;  // How long to wait before rejoining after leaving (5 seconds)
// const DEPLOY_SPACING  = 1;   // Delay between each bot joining to prevent server kicks

// // --- [ 2. GAME DATA ] ---
// const SERVER_URL      = 'wss://game-server-CABbs.voxiom.io'; 
// const JOIN_HEX        = '0387010205';
// const BASE_HEX        = '00000022e03fcd35ddbfc90fdb460b28007f7f0000';
// const SELECT_4_HEX    = '0000001466bf0320cbbf812dfb45a3135e7f7f010003';
// const TICK_RATE       = 60; 

// function deploySoldier(id) {
//     console.log(`[*] Soldier #${id} preparing for deployment...`);
    
//     const ws = new WebSocket(SERVER_URL, {
//         headers: { 'Origin': 'https://voxiom.io' }
//     });

//     let toggle = false;
//     let brain;
//     let sessionTimer;

//     ws.on('open', () => {
//         ws.send('40'); 

//         setTimeout(() => {
//             if (ws.readyState === WebSocket.OPEN) {
//                 ws.send(Buffer.from(JOIN_HEX, 'hex'));
//                 console.log(`[+] Soldier #${id} DEPLOYED. Stay time: ${SESSION_LENGTH / 1000}s`);

//                 // Force slot 4
//                 ws.send(Buffer.from(SELECT_4_HEX, 'hex'));

//                 // ACTION LOOP (Jumping & Placing)
//                 brain = setInterval(() => {
//                     if (ws.readyState === WebSocket.OPEN) {
//                         let packet = toggle ? BASE_HEX.slice(0, -1) + "2" : BASE_HEX.slice(0, -1) + "3";
//                         ws.send(Buffer.from(packet, 'hex'));
//                         ws.send(Buffer.from(SELECT_4_HEX, 'hex'));
//                         toggle = !toggle;
//                     }
//                 }, TICK_RATE);

//                 // SESSION TIMER (When they leave)
//                 sessionTimer = setTimeout(() => {
//                     console.log(`[!] Soldier #${id} session expired. Leaving...`);
//                     ws.close();
//                 }, SESSION_LENGTH);
//             }
//         }, 1200);
//     });

//     ws.on('close', () => {
//         // Clean up loops
//         clearInterval(brain);
//         clearTimeout(sessionTimer);
        
//         // REJOIN LOGIC
//         console.log(`[-] Soldier #${id} disconnected. Rejoining in ${REJOIN_DELAY / 1000}s...`);
//         setTimeout(() => deploySoldier(id), REJOIN_DELAY);
//     });

//     ws.on('error', () => {});
// }

// // --- [ 3. START THE FACTORY ] ---
// console.log(`Starting Soldier Factory...`);
// for (let i = 1; i <= TOTAL_BOTS; i++) {
//     setTimeout(() => deploySoldier(i), i * DEPLOY_SPACING);
// }
