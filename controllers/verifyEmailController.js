
import { storeTempUserData, getTempUserData, deleteTempUserData } from '../tempStorage/tempStorage.js';
import { sendVerificationEmail } from '../services/emailService.js';

export const sendCode = async (req, res) => {
  const { email } = req.body;

  try {
    // Générer un code de vérification
    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    // Envoyer le code par email
    await sendVerificationEmail(email, verificationCode);

    // Stocker temporairement les données
    await storeTempUserData(email, { email, verificationCode });
    
    res.status(200).json({ success: true, message: 'Code de vérification envoyé avec succès' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erreur lors de l\'envoi du code' });
  }
};

export const emailVerifys = async (req, res) => {
  const { email, code } = req.body;

  try {
    // Récupérer les données temporaires
    const tempUserData = await getTempUserData(email);
    
    const codeNumber = parseInt(code, 10);
    if (!tempUserData) {
      return res.status(400).json({ success: false, message: 'Aucun code de vérification trouvé pour cet email' });
    }
    if ( tempUserData.verificationCode !== codeNumber ) {
      return res.status(400).json({ success: false, message: 'Code invalide ou ne correspond a celui que vous avez recu dans votre boite mail' });
    }

      await deleteTempUserData(email);
    
      res.status(200).json({ success: true, message: 'Email vérifié avec succès' });

  } catch (error) {
    console.error('Erreur lors de la vérification :', error); 
    res.status(500).json({ success: false, message: 'Erreur lors de la vérification' });
  }
};