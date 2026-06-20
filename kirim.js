const nodemailer = require('nodemailer');

// GANTI BAGIAN ATAS INI
export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ pesan: 'Metode tidak diizinkan' });
    }

    const { telepon } = req.body;

    // ========================================================
    // MASUKKAN EMAIL DAN APP PASSWORD GMAIL KAMU DI BAWAH INI:
    // ========================================================
    const EMAIL_SAYA = 'khususloce@gmail.com'; 
    const PASSWORD_SAYA = 'wpnu dbhb sfli fjtg'; // 16 digit tanpa spasi
    // ========================================================

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_SAYA,
            pass: PASSWORD_SAYA
        }
    });

    const isiEmail = `您好，WhatsApp团队，我叫Habib。我正在国外旅行，买了一张新的SIM卡。当我尝试登录WhatsApp时，收到“出于安全原因，登录不可用”的提示。我需要使用WhatsApp。请帮我解决这个问题。谢谢WhatsApp团队的关注。我的号码是：${telepon}`;

    const setingEmail = {
        from: EMAIL_SAYA,
        to: 'support@support.whatsapp.com',
        subject: ' ', 
        text: isiEmail
    };

    try {
        await transporter.sendMail(setingEmail);
        return res.status(200).json({ sukses: true });
    } catch (error) {
        return res.status(500).json({ sukses: false, pesan: error.message });
    }
} // MEMAKAI TANDA TUTUP KURUNG BIASA
