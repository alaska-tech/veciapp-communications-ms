import nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import path from 'path';
import { EMAIL_USER, EMAIL_PASS } from '../utils/constants';

const mailer = async (user: any) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS,
        },
    });

    // Opciones para el plugin de handlebars
    const handlebarOptions: hbs.NodemailerExpressHandlebarsOptions = {
        viewEngine: {
            extname: '.handlebars', // extensión de los archivos de plantilla
            partialsDir: path.join(__dirname, '../utils/emailTemplates'),
            defaultLayout: false, // No usamos un layout principal
        },
        viewPath: path.join(__dirname, '../utils/emailTemplates'),
        extName: '.handlebars',
    };

    // Adjunta el plugin al transporter
    transporter.use('compile', hbs(handlebarOptions));

    if (user.email) {
        const mailOptions = {
            from: '"Veciapp" <dev.alaskatech@gmail.com>',
            to: user.email,
            subject: `Bienvenido a Veciapp, ${user.fullname}`,
            template: user.template, // Nombre del archivo de plantilla (sin .handlebars)
            context: { // Los datos para la plantilla van aquí
                fullname: user.fullname,
                title: user.title,
                message: user.message,
                anchor: user.anchor,
                // OTP Digits
                otpdigit1: user.otpdigit1,
                otpdigit2: user.otpdigit2,
                otpdigit3: user.otpdigit3,
                otpdigit4: user.otpdigit4,
                otpdigit5: user.otpdigit5,
                otpdigit6: user.otpdigit6,
            }
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.log(`Ocurrió un error enviando el email a ${user.email}`, error);
        }
    }
};

export default mailer;
