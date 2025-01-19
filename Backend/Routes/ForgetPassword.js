const nodeMailer=require("nodemailer");
const dotenv=require("dotenv");
dotenv.config();

const transport=nodeMailer.createTransport({
    service:'gmail',
    auth:{
        user:process.env.GMAIL_USER,
        pass:process.env.GMAIL_PASSWORD
        
    }
})
console.log(process.env.Gmail_PASSWORD,process.env.Gmail_USER)


const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const MailOptions = async (email,subject, text) => {
    console.log(email)
    if (!email || !isValidEmail(email)) {
        console.log("enter valid email")
    }

    try {
        await transport.sendMail({
            from:"venkatreddy30301@gmail.com",
            to: email,
            subject,
            text,
        });
        console.log("Email sent successfully!");
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
};

module.exports=MailOptions