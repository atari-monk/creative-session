import { PeerChatUI } from './peer-chat-ui.js';
import { PeerHandler } from './peer-handler.js';

const peerHandler = new PeerHandler();
const chatUI = new PeerChatUI(peerHandler);
peerHandler.setPeerChatUI(chatUI);