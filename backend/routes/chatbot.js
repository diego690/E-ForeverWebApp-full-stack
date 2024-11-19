import express from 'express'
import {handlerChatbotMessage} from '../controllers/chatbotController.js'

const router = express.Router();

router.post('/api/chatbot', handlerChatbotMessage);

export default router;