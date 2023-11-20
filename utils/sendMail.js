import nodemailer from "nodemailer";
import hbs from "nodemailer-express-handlebars";
import path from "path";

export const EmailEnums = Object.freeze({
  otp: "otp",
});
export const EmailTempletes = Object.freeze({ otp: "otp" });

const handlebarsOptions = {
    viewEngine:{
        partialDir:path.resolve("./views/"),
        defaultLayout:false,    
    },
    viewPath:path.resolve("./views/")
}

const sendMail = async ({email,subject,  otp,  template, type ,data}) => {

    const transporter  = nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:true,
        tls:{
            rejectUnauthorized:false,
        },
        auth:{
            user:process.env.SMTP_MAIL,
            pass:process.env.SMTP_PASSWORD,
        }
    });
    transporter.use("compile", hbs(handlebarsOptions));


    switch (type) {
        case EmailEnums.otp:
            
            const mailOptions ={
                from: `"MuscleGaurd" <process.env.SMTP_MAIL>`,
                template,
                to:email,
                subject,
                context:{
                    otp
                }

            }

            await transporter.sendMail(mailOptions)

            break;
    
        default:
            break;
    }

}

export {sendMail}