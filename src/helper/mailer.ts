import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from "bcryptjs";

export const sendEmail = async({email,emailType,userId}: any) => {
    try {
        const hashToken = bcryptjs.hash(userId.toString(),10)

        if(emailType == "VERIFY"){
        await User.findByIdAndUpdate(userId,
            {
                verifyToken: hashToken,
                verifyTokenExpiry: Date.now() + 3600000 
            })
        }else if(emailType == "RESET"){
            await User.findByIdAndUpdate(userId,
                {
                    verifyPasswordToken: hashToken,
                    verifyPasswordTokenExpiry: Date.now() + 3600000 
                })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "b7330a559553b6",
              pass: "********b624",
              //add to env
            }
          });


          const mailOptions = {
            from: 'sahilghadi514@gmail.com',
            to: email,
            subject: emailType === "VERIFY"? "verify your email":"verify your password",
            html: `<p> Click <a href="${process.env.DOMAIN}/verifyemail?token?=${hashToken}">here></a> to ${emailType==="VERIFY"?"verify your email": "verify your password"}</p>`
          }

          const mailRes = await transport.sendMail(mailOptions);
          return mailRes;
    } catch (error:any) {
        throw new Error(error.message)
    }
}