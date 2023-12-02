import nodemailer from "nodemailer";
export const sendMail=async(message,emailid,sub)=>{
    if (emailid) {
        let sender = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "fenilpanseriya2004@gmail.com",
            pass: "pxvi gtdd nmku xmnw",
          },
        });
        
          let mailOptions = {
            from: "fenilpanseriya2004@gmail.com",
            to: emailid,
            subject: sub,
            text: message,
          };
    
          const response=await sender.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log("Email sent successfully");
            }
          });
        
    }
}
