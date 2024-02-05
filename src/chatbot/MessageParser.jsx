// in MessageParser.js
import React from 'react';
import axios from 'axios';


const random5DigitNumber = Math.floor(10000 + Math.random() * 90000);
const url = `https://general-runtime.voiceflow.com/state/user/userabc${random5DigitNumber}/interact`;

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    if (message) {
        const headers = {
            'Authorization': 'VF.DM.65af7f1c82dc5400075b735f.Fjbo8recYKTJV3C5',
            'Content-Type': 'application/json'
          };
          
          const payload = {
            action: {
              type: 'text',
              payload: `${message}`
            }
          };

          axios.post(url, payload, { headers })
            .then(response => {

              const msg =response.data.map((data)=> data.payload.message + ". ").concat()
              console.log(msg)
              
              actions.handleHello(msg)
              // for(let i=0;i<response.data.length;i++){
              //   const element = response.data[i]
              //   console.log(element)
              //   console.log(element.type)
              //   if(element.type === "speak"){
              //       // setTimeout(()=>{
              //       //   actions.handleHello(element.payload.message);
              //       // },Math.random() * 100)
              //      actions.handleHello(element.payload.message);
              //   }else if(element.type === "end"){
              //     actions.handleHello("Thanks your interaction!")
              //   }
              // }
              
              // response.data.forEach(element => {
              //     console.log(element)
              //     console.log(element.type)
              //     if(element.type === "speak"){
              //         setTimeout(()=>{
              //           actions.handleHello(element.payload.message);
              //         },Math.random() * 100)
              //        //actions.handleHello(element.payload.message);
              //     }else if(element.type === "end"){
              //       actions.handleHello("Thanks your interaction!")
              //     }
              // });
            })
            .catch(error => {
              console.error(error);
              actions.handleHello(error);
            });

    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;