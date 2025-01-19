import {useState}from "react";
import "./index.css"
function Message({success,message}){
    console.log(success,message);
    return(
        <>
            <div>
                <div className={`message ${success===true?"green":"red"}`}>
                    <div className="promt">
                        <p>{message}</p>
                        <h3>X</h3>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Message;