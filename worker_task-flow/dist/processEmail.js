"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const parser = (ActionMetaData, zapMetaData, startDelimeter = "{", endDelimeter = "}") => {
    let startIndex = 0;
    let endIndex = 1;
    let finalString = "";
    while (endIndex < ActionMetaData.length) {
        if (ActionMetaData[startIndex] === startDelimeter) {
            let endPoint = startIndex + 1;
            while (ActionMetaData[endPoint] !== endDelimeter) {
                endPoint++;
            }
            // from 
            let stringHoldingValue = ActionMetaData.slice(startIndex + 1, endPoint);
            const keys = stringHoldingValue.split(".");
            let localValues = Object.assign({}, zapMetaData);
            //this will drill the json object and get the actual value
            for (let i = 0; i < keys.length; i++) {
                if (typeof localValues === "string") {
                    localValues = JSON.parse(localValues);
                }
                localValues = localValues[keys[i]];
            }
            finalString += localValues;
            startIndex = endPoint + 1;
            endIndex = endPoint + 2;
        }
        else {
            finalString += ActionMetaData[startIndex];
            startIndex++;
            endIndex++;
        }
    }
    if (ActionMetaData[startIndex]) {
        finalString += ActionMetaData[startIndex];
    }
    return finalString;
};
const transporter = nodemailer_1.default.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "aakashsinghrajput.8168@gmail.com",
        pass: "mzrdlpeyuparnjoq",
    },
});
// async..await is not allowed in global scope, must use a wrapper
function sendGmail(from, to, body, subject) {
    return __awaiter(this, void 0, void 0, function* () {
        // send mail with defined transport object
        try {
            console.log("sending gmail");
            const info = yield transporter.sendMail({
                from: from, // sender address
                to: to, // list of receivers
                subject: `<h1>Nike</h1>`,
                //   text: body, // plain text body
                html: `${body}`, // html body
            });
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
    });
}
const processEmail = (ActionMetaData, zapMetaData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("action meta data", ActionMetaData);
    console.log("action meta data from", ActionMetaData.from);
    const from = parser(ActionMetaData.from, zapMetaData);
    const to = parser(ActionMetaData.to, zapMetaData);
    // const subject = parser(ActionMetaData.subject as string,zapMetaData)
    const body = parser(ActionMetaData.body, zapMetaData);
    //     const body =`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    // <html dir="ltr" lang="en">
    //   <head>
    //     <link rel="preload" as="image" href="https://react-email-demo-5c0l8sni5-resend.vercel.app/static/nike-logo.png" />
    //     <link rel="preload" as="image" href="https://react-email-demo-5c0l8sni5-resend.vercel.app/static/nike-product.png" />
    //     <link rel="preload" as="image" href="https://react-email-demo-5c0l8sni5-resend.vercel.app/static/nike-recomendation-1.png" />
    //     <link rel="preload" as="image" href="https://react-email-demo-5c0l8sni5-resend.vercel.app/static/nike-recomendation-2.png" />
    //     <link rel="preload" as="image" href="https://react-email-demo-5c0l8sni5-resend.vercel.app/static/nike-recomendation-4.png" />
    //     <link rel="preload" as="image" href="https://react-email-demo-5c0l8sni5-resend.vercel.app/static/nike-phone.png" />
    //     <meta content="text/html; charset=UTF-8" http-equiv="Content-Type" />
    //     <meta name="x-apple-disable-message-reformatting" /><!--$-->
    //   </head>
    //   <div style="display:none;overflow:hidden;line-height:1px;opacity:0;max-height:0;max-width:0">Get your order summary, estimated delivery date and more<div> ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿ ‌​‍‎‏﻿</div>
    //   </div>
    //   <body style="background-color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,Oxygen-Sans,Ubuntu,Cantarell,&quot;Helvetica Neue&quot;,sans-serif">
    //     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="max-width:100%;margin:10px auto;width:600px;border:1px solid #E5E5E5">
    //       <tbody>
    //         <tr style="width:100%">
    //           <td>
    //             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:22px 40px;background-color:#F7F7F7">
    //               <tbody>
    //                 <tr>
    //                   <td>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <td data-id="__react-email-column">
    //                             <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Tracking Number</p>
    //                             <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">1ZV218970300071628</p>
    //                           </td>
    //                           <td align="right" data-id="__react-email-column"><a style="color:#000;text-decoration:none;border:1px solid #929292;font-size:16px;padding:10px 0px;width:220px;display:block;text-align:center;font-weight:500" target="_blank">Track Package</a></td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //             <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
    //             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:40px 74px;text-align:center">
    //               <tbody>
    //                 <tr>
    //                   <td><img alt="Nike" height="22" src="https://react-email-demo-5c0l8sni5-resend.vercel.app/static/nike-logo.png" style="display:block;outline:none;border:none;text-decoration:none;margin:auto" width="66" />
    //                     <h1 style="font-size:32px;line-height:1.3;font-weight:700;text-align:center;letter-spacing:-1px">It&#x27;s On Its Way.</h1>
    //                     <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">You order&#x27;s is on its way. Use the link above to track its progress.</p>
    //                     <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500;margin-top:24px">We´ve also charged your payment method for the cost of your order and will be removing any authorization holds. For payment details, please visit your Orders page on Nike.com or in the Nike app.</p>
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //             <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
    //             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:40px;padding-right:40px;padding-top:22px;padding-bottom:22px">
    //               <tbody>
    //                 <tr>
    //                   <td>
    //                     <p style="font-size:15px;line-height:2;margin:0;font-weight:bold">Shipping to: Alan Turing</p>
    //                     <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">2125 Chestnut St, San Francisco, CA 94123</p>
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //             <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
    //             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:40px;padding-right:40px;padding-top:40px;padding-bottom:40px">
    //               <tbody>
    //                 <tr>
    //                   <td>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <td data-id="__react-email-column"><img alt="Brazil 2022/23 Stadium Away Women&#x27;s Nike Dri-FIT Soccer Jersey" src="https://react-email-demo-5c0l8sni5-resend.vercel.app/static/nike-product.png" style="display:block;outline:none;border:none;text-decoration:none;float:left" width="260px" /></td>
    //                           <td data-id="__react-email-column" style="vertical-align:top;padding-left:12px">
    //                             <p style="font-size:14px;line-height:2;margin:0;font-weight:500">Brazil 2022/23 Stadium Away Women&#x27;s Nike Dri-FIT Soccer Jersey</p>
    //                             <p style="font-size:14px;line-height:2;margin:0;color:#747474;font-weight:500">Size L (12–14)</p>
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //             <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
    //             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:40px;padding-right:40px;padding-top:22px;padding-bottom:22px">
    //               <tbody>
    //                 <tr>
    //                   <td>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="display:inline-flex;margin-bottom:40px">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <td data-id="__react-email-column" style="width:170px">
    //                             <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Number</p>
    //                             <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">C0106373851</p>
    //                           </td>
    //                           <td data-id="__react-email-column">
    //                             <p style="font-size:14px;line-height:2;margin:0;font-weight:bold">Order Date</p>
    //                             <p style="font-size:14px;line-height:1.4;margin:12px 0 0 0;font-weight:500;color:#6F6F6F">Sep 22, 2022</p>
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <td align="center" data-id="__react-email-column"><a style="color:#000;text-decoration:none;border:1px solid #929292;font-size:16px;padding:10px 0px;width:220px;display:block;text-align:center;font-weight:500" target="_blank">Order Status</a></td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //             <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
    //             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
    //               <tbody>
    //                 <tr>
    //                   <td>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <p style="font-size:32px;line-height:1.3;margin:16px 0;font-weight:700;text-align:center;letter-spacing:-1px">Top Picks For You</p>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding:20px 0">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <td align="center" data-id="__react-email-column" style="vertical-align:top;text-align:left;padding-left:4px;padding-right:2px"><img alt="Brazil 2022/23 Stadium Away Women&#x27;s Nike Dri-FIT Soccer Jersey" src="https://react-email-demo-5c0l8sni5-resend.vercel.app/static/nike-recomendation-1.png" style="display:block;outline:none;border:none;text-decoration:none" width="100%" />
    //                             <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:12px;font-weight:500">USWNT 2022/23 Stadium Home</p>
    //                             <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:4px;color:#747474">Women&#x27;s Nike Dri-FIT Soccer Jersey</p>
    //                           </td>
    //                           <td align="center" data-id="__react-email-column" style="vertical-align:top;text-align:left;padding-left:2px;padding-right:2px"><img alt="Brazil 2022/23 Stadium Away Women&#x27;s Nike Dri-FIT Soccer Jersey" src="https://react-email-demo-5c0l8sni5-resend.vercel.app/static/nike-recomendation-2.png" style="display:block;outline:none;border:none;text-decoration:none" width="100%" />
    //                             <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:12px;font-weight:500">Brazil 2022/23 Stadium Goalkeeper</p>
    //                             <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:4px;color:#747474">Men&#x27;s Nike Dri-FIT Short-Sleeve Football Shirt</p>
    //                           </td>
    //                           <td align="center" data-id="__react-email-column" style="vertical-align:top;text-align:left;padding-left:2px;padding-right:2px"><img alt="Brazil 2022/23 Stadium Away Women&#x27;s Nike Dri-FIT Soccer Jersey" src="https://react-email-demo-5c0l8sni5-resend.vercel.app/static/nike-recomendation-4.png" style="display:block;outline:none;border:none;text-decoration:none" width="100%" />
    //                             <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:12px;font-weight:500">FFF</p>
    //                             <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:4px;color:#747474">Women&#x27;s Soccer Jacket</p>
    //                           </td>
    //                           <td align="center" data-id="__react-email-column" style="vertical-align:top;text-align:left;padding-left:2px;padding-right:4px"><img alt="Brazil 2022/23 Stadium Away Women&#x27;s Nike Dri-FIT Soccer Jersey" src="https://react-email-demo-5c0l8sni5-resend.vercel.app/static/nike-recomendation-4.png" style="display:block;outline:none;border:none;text-decoration:none" width="100%" />
    //                             <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:12px;font-weight:500">FFF</p>
    //                             <p style="font-size:15px;line-height:1;margin:0;padding-left:10px;padding-right:10px;padding-top:4px;color:#747474">Women&#x27;s Nike Pre-Match Football Top</p>
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //             <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
    //             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:20px;padding-right:20px;padding-top:20px;background-color:#F7F7F7">
    //               <tbody>
    //                 <tr>
    //                   <td>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <p style="font-size:14px;line-height:24px;margin:16px 0;padding-left:20px;padding-right:20px;font-weight:bold">Get Help</p>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px;padding-left:20px;padding-right:20px">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <td colSpan="1" data-id="__react-email-column" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Shipping Status</a></td>
    //                           <td colSpan="1" data-id="__react-email-column" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Shipping &amp; Delivery</a></td>
    //                           <td colSpan="1" data-id="__react-email-column" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Returns &amp; Exchanges</a></td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:0;padding-bottom:22px;padding-left:20px;padding-right:20px">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <td colSpan="1" data-id="__react-email-column" style="width:33%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">How to Return</a></td>
    //                           <td colSpan="2" data-id="__react-email-column" style="width:66%"><a href="/" style="color:#000;text-decoration:none;font-size:13.5px;margin-top:0;font-weight:500" target="_blank">Contact Options</a></td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                     <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-left:20px;padding-right:20px;padding-top:32px;padding-bottom:22px">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <td data-id="__react-email-column">
    //                             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
    //                               <tbody style="width:100%">
    //                                 <tr style="width:100%">
    //                                   <td data-id="__react-email-column" style="width:16px"><img height="26px" src="https://react-email-demo-5c0l8sni5-resend.vercel.app/static/nike-phone.png" style="display:block;outline:none;border:none;text-decoration:none;padding-right:14px" width="16px" /></td>
    //                                   <td data-id="__react-email-column">
    //                                     <p style="font-size:13.5px;line-height:24px;margin:16px 0;margin-top:0;font-weight:500;color:#000;margin-bottom:0">1-800-806-6453</p>
    //                                   </td>
    //                                 </tr>
    //                               </tbody>
    //                             </table>
    //                           </td>
    //                           <td data-id="__react-email-column">
    //                             <p style="font-size:13.5px;line-height:24px;margin:16px 0;margin-top:0;font-weight:500;color:#000;margin-bottom:0">4 am - 11 pm PT</p>
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //             <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0" />
    //             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
    //               <tbody>
    //                 <tr>
    //                   <td>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <p style="font-size:32px;line-height:1.3;margin:16px 0;font-weight:700;text-align:center;letter-spacing:-1px">Nike.com</p>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:370px;margin:auto;padding-top:12px">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Men</a></td>
    //                           <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Women</a></td>
    //                           <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Kids</a></td>
    //                           <td align="center" data-id="__react-email-column"><a href="/" style="color:#000;text-decoration:none;font-weight:500" target="_blank">Customize</a></td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //             <hr style="width:100%;border:none;border-top:1px solid #eaeaea;border-color:#E5E5E5;margin:0;margin-top:12px" />
    //             <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="padding-top:22px;padding-bottom:22px">
    //               <tbody>
    //                 <tr>
    //                   <td>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation" style="width:166px;margin:auto">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <td data-id="__react-email-column">
    //                             <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">Web Version</p>
    //                           </td>
    //                           <td data-id="__react-email-column">
    //                             <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">Privacy Policy</p>
    //                           </td>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center;padding-top:30px;padding-bottom:30px">Please contact us if you have any questions. (If you reply to this email, we won&#x27;t be able to see it.)</p>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">© 2022 Nike, Inc. All Rights Reserved.</p>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                     <table align="center" width="100%" border="0" cellPadding="0" cellSpacing="0" role="presentation">
    //                       <tbody style="width:100%">
    //                         <tr style="width:100%">
    //                           <p style="font-size:13px;line-height:24px;margin:0;color:#AFAFAF;text-align:center">NIKE, INC. One Bowerman Drive, Beaverton, Oregon 97005, USA.</p>
    //                         </tr>
    //                       </tbody>
    //                     </table>
    //                   </td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //           </td>
    //         </tr>
    //       </tbody>
    //     </table><!--/$-->
    //   </body>
    // </html>`
    console.log(`from ${from} to ${to}`);
    sendGmail(from, to, body, "Subject");
});
exports.processEmail = processEmail;
