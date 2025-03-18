import express from 'express';
import { sendCode, emailVerifys } from '../controllers/verifyEmailController.js';

const router = express.Router();

/**
 * @swagger
 * /service-email-notify/send-code:
 *   post:
 *     summary: Envoie un code de vérification par e-mail
 *     description: Envoie un code de vérification à l'adresse e-mail fournie.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: L'adresse e-mail à laquelle envoyer le code de vérification.
 *                 example: dollar@gmail.com
 *     responses:
 *       200:
 *         description: Code de vérification envoyé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Code sent successfully
 *       400:
 *         description: Requête invalide (par exemple, e-mail manquant ou invalide).
 *       500:
 *         description: Erreur serveur lors de l'envoi du code.
 */
router.post('/send-code', sendCode);

/**
 * @swagger
 * /service-email-notify/verify-code:
 *   post:
 *     summary: Vérifie le code de vérification
 *     description: Vérifie si le code de vérification fourni correspond à celui envoyé par e-mail.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: L'adresse e-mail associée au code de vérification.
 *                 example: dollar@gmail.com
 *               code:
 *                 type: string
 *                 description: Le code de vérification à valider.
 *                 example: "123123"
 *     responses:
 *       200:
 *         description: Code de vérification validé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Code verified successfully
 *       400:
 *         description: Requête invalide (par exemple, code ou e-mail manquant ou incorrect).
 *       401:
 *         description: Code de vérification incorrect ou expiré.
 *       500:
 *         description: Erreur serveur lors de la vérification du code.
 */
router.post('/verify-code', emailVerifys);

export default router;