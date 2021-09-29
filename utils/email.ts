import * as mailer from 'nodemailer';
import { getMaxListeners } from 'process';

const MailSender =async(mail,key)=>{
let testAccount=await mailer.createTestAccount()
var transport = mailer.createTransport({
    host: "smtp.gmail.com",
    port:465,
    
    auth: {
      user: "pratiksharegmi42@gmail.com",
      pass: "Asd7654*##"
    }
  });
  const eventAddedMessage=`<strong>Thank you for adding event</strong> 
    <p>Event Finder team,appreciates your effort and time on adding new event on our platform.Our team will review your event and notify you soon.We wish you all the best for your event.</p>
  `
  const eventSubject='Event information is received'

  const eventContactMessage=`<strong>Thank you for query</strong> 
    <p>Event Finder team,appreciates your effort and time .Our team will contact you soon.</p>
  `
  const ContactSubject='Your query is received'


let mailInfo=await transport.sendMail({
    from:'abc@gmail.com',
    to:mail,
    subject:key==1?eventSubject:ContactSubject,
    html:key==1?eventAddedMessage:eventContactMessage
   

})
console.log(mailInfo);

}
export {MailSender} 