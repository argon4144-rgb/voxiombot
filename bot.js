// const WebSocket = require('ws');

// // --- SETTINGS (Change these only) ---
// const SERVER_URL = 'wss://game-server-IE4Sm.voxiom.io/'; 
// const JOIN_HEX   = '0387010205';

// const TOTAL_BOTS    = 20;    // Number of soldiers to spawn
// const DEPLOY_GAP    = 1;  // Wait 1 second between each new soldier joining
// const STAY_DURATION = 3000; // How long (ms) a bot stays in game before leaving (20s)
// const RESTART_DELAY = 1000;  // How long (ms) to wait before a bot rejoins (2s)
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

// // --- 1. CONFIGURATION (Update these) ---
// const SERVER_URL = 'wss://game-server-pQ9Mc.voxiom.io/'; // The one with the &sid=
// const JOIN_HEX   = '0387010205'; // The first green message from network tab

// // --- 2. YOUR DISCOVERED HEX CODES ---
// const JUMP_HEX = '00000023f5c0430dbcbddd400d460f88bf7f7f0001'; // The one ending in 01
// const IDLE_HEX = '00000023efc0430dbcbddd400d460f6f047f7f0000'; // The one ending in 00

// const TOTAL_BOTS = 15;

// function deploySoldier(id) {
//     // Connect with a fake Origin to bypass simple browser checks
//     const ws = new WebSocket(SERVER_URL, {
//         headers: { 'Origin': 'https://voxiom.io' }
//     });

//     ws.on('open', () => {
//         // Step 1: Socket.io Handshake
//         ws.send('40'); 

//         // Step 2: Join the match
//         setTimeout(() => {
//             if (ws.readyState === WebSocket.OPEN) {
//                 ws.send(Buffer.from(JOIN_HEX, 'hex'));
//                 console.log(`[+] Soldier #${id} is in and jumping!`);

//                 // --- THE JUMP LOOP (The Heart of your Bot) ---
//                 // This repeats every 100ms just like your .txt file
//                 // --- TURBO JUMP SETTINGS ---
//                 const JUMP_SPEED = 40;  // Repeat every 40ms (much faster)
//                 const TAP_DELAY  = 20;  // Release the key after 20ms

//                 const jumpBrain = setInterval(() => {
//                     if (ws.readyState === WebSocket.OPEN) {
//                         // 1. Send Jump
//                         ws.send(Buffer.from(JUMP_HEX, 'hex'));

//                         // 2. Quick Release
//                         setTimeout(() => {
//                             if (ws.readyState === WebSocket.OPEN) {
//                                 ws.send(Buffer.from(IDLE_HEX, 'hex'));
//                             }
//                         }, TAP_DELAY); 
//                     } else {
//                         clearInterval(jumpBrain);
//                     }
//             }, JUMP_SPEED);
//             }
//         }, 1000);
//     });

//     ws.on('close', () => {
//         // If a bot gets kicked, it waits 2 seconds and joins back
//         setTimeout(() => deploySoldier(id), 2000);
//     });

//     ws.on('error', (err) => {
//         console.log(`[!] Soldier ${id} Error: ${err.message}`);
//     });
// }

// // Start the factory - staggered start so the server doesn't lag
// console.log(`Deploying ${TOTAL_BOTS} Jumping Soldiers...`);
// for (let i = 1; i <= TOTAL_BOTS; i++) {
//     setTimeout(() => deploySoldier(i), i * 1000);
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

// // --- 1. CONFIGURATION ---
// const SERVER_URL = 'wss://game-server-cabbs.voxiom.io'; 
// const JOIN_HEX   = '0387010205';

// // Your verified "Look at feet" base (40 characters)
// const BASE_HEX = '00000022e03fcd35ddbfc90fdb460b28007f7f0000';

// // Your verified "Select Slot 4" packet
// const SELECT_4_HEX = '0000001466bf0320cbbf812dfb45a3135e7f7f010003';

// const TOTAL_BOTS = 15;
// const TICK_RATE  = 50; // 50ms is perfect for building towers

// function deploySoldier(id) {
//     const ws = new WebSocket(SERVER_URL, {
//         headers: { 'Origin': 'https://voxiom.io' }
//     });

//     let toggle = false;

//     ws.on('open', () => {
//         ws.send('40'); // Handshake

//         setTimeout(() => {
//             if (ws.readyState === WebSocket.OPEN) {
//                 // 1. Join
//                 ws.send(Buffer.from(JOIN_HEX, 'hex'));
//                 console.log(`[+] Soldier #${id} - TOWERING: Jump + Place + Slot 4`);

//                 // 2. Initial selection
//                 ws.send(Buffer.from(SELECT_4_HEX, 'hex'));

//                 // 3. THE ACTION LOOP
//                 const brain = setInterval(() => {
//                     if (ws.readyState === WebSocket.OPEN) {
                        
//                         // --- PACKET A: THE PHYSICS (JUMP + PLACE) ---
//                         // We use your 'slice' logic but with new bits:
//                         // 3 = Jump AND Place (Right Click)
//                         // 2 = Just Place (Right Click)
                        
//                         let jumpPlacePacket;
//                         if (!toggle) {
//                             // Bit 3 = Jump + Right Click
//                             jumpPlacePacket = BASE_HEX.slice(0, -1) + "3"; 
//                         } else {
//                             // Bit 2 = Just Right Click (While falling)
//                             jumpPlacePacket = BASE_HEX.slice(0, -1) + "2";
//                         }
//                         ws.send(Buffer.from(jumpPlacePacket, 'hex'));

//                         // --- PACKET B: LOCK SLOT 4 ---
//                         // We send this every tick so they never stop holding the block
//                         ws.send(Buffer.from(SELECT_4_HEX, 'hex'));
                        
//                         toggle = !toggle; 
//                     } else {
//                         clearInterval(brain);
//                     }
//                 }, TICK_RATE);
//             }
//         }, 1200); 
//     });

//     ws.on('close', () => {
//         setTimeout(() => deploySoldier(id), 2000);
//     });
// }

// // Start the army
// console.log(`Launching 15 Tower Builders...`);
// for (let i = 1; i <= TOTAL_BOTS; i++) {
//     setTimeout(() => deploySoldier(i), i * 700);
// }





// const WebSocket = require('ws');

// // --- 1. CONFIGURATION ---
// const SERVER_URL = 'wss://game-server-cabbs.voxiom.io'; 
// const JOIN_HEX   = '0387010205';

// // YOUR VERIFIED BASE (Do not change this, it works!)
// const BASE_HEX = '00000022e03fcd35ddbfc90fdb460b28007f7f0000';

// // YOUR VERIFIED SLOT 4
// const SELECT_4_HEX = '0000001466bf0320cbbf812dfb45a3135e7f7f010003';

// const TOTAL_BOTS = 15;
// // 60ms is the "Sweet Spot" to prevent spinning and allow building
// const TICK_RATE  = 60; 

// function deploySoldier(id) {
//     const ws = new WebSocket(SERVER_URL, {
//         headers: { 'Origin': 'https://voxiom.io' }
//     });

//     let toggle = false;

//     ws.on('open', () => {
//         ws.send('40'); 

//         setTimeout(() => {
//             if (ws.readyState === WebSocket.OPEN) {
//                 ws.send(Buffer.from(JOIN_HEX, 'hex'));
//                 console.log(`[+] Soldier #${id} - Towering Active`);

//                 // Force slot 4 once at the start
//                 ws.send(Buffer.from(SELECT_4_HEX, 'hex'));

//                 const brain = setInterval(() => {
//                     if (ws.readyState === WebSocket.OPEN) {
                        
//                         let packet;
//                         // 3 = Jump + Place
//                         // 2 = Just Place
//                         if (!toggle) {
//                             packet = BASE_HEX.slice(0, -1) + "3"; 
//                         } else {
//                             packet = BASE_HEX.slice(0, -1) + "2";
//                         }

//                         // SEND JUMP/PLACE
//                         ws.send(Buffer.from(packet, 'hex'));

//                         // SEND SLOT LOCK (Separate packet ensures it works)
//                         ws.send(Buffer.from(SELECT_4_HEX, 'hex'));
                        
//                         toggle = !toggle; 
//                     } else {
//                         clearInterval(brain);
//                     }
//                 }, TICK_RATE);
//             }
//         }, 1200); 
//     });

//     ws.on('close', () => setTimeout(() => deploySoldier(id), 2000));
// }

// console.log(`Deploying 15 Tower Builders...`);
// for (let i = 1; i <= TOTAL_BOTS; i++) {
//     setTimeout(() => deploySoldier(i), i * 800);
// }


const WebSocket = require('ws');

// --- [ 1. CONFIGURATION VARIABLES ] ---
const TOTAL_BOTS      = 15;    // How many soldiers to deploy
const SESSION_LENGTH  = 600; // How long they stay (in milliseconds). 60000 = 1 minute.
const REJOIN_DELAY    = 1;  // How long to wait before rejoining after leaving (5 seconds)
const DEPLOY_SPACING  = 1;   // Delay between each bot joining to prevent server kicks

// --- [ 2. GAME DATA ] ---
const SERVER_URL      = 'wss://game-server-pQ9Mc.voxiom.io'; 
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
