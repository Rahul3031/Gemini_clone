import { createContext, useState} from "react";
import run from "../config/gemini";

export const context = createContext();

const ContextProvider = (props) =>{


    const [input,setInput] = useState("");
    const [recentPrompt,setRecentPrompt] = useState("");
    const [prevPrompts,setPrevPrompts] = useState([]);
    const [showResult,setShowResult] = useState(false);
    const [loading,setLoading] = useState(false);
    const [resultData,setResultData] = useState("");


    const delayPara = (index,nextWord) => {
        setTimeout(function(){
           setResultData(prev=>prev+nextWord);
        }, 75*index);
    }

    const newChat = () => {
        setLoading(false);
        setShowResult(false);
    }

    const onsent = async (prompt) =>{

        setResultData("");
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt!== undefined){
            setRecentPrompt(prompt);
            response = await run(prompt);
        }
        else{
            setRecentPrompt(input);
            setPrevPrompts(prev=>[...prev,input]);
            response = await run(input);
        }
        let responseArray=response.split("**");
        let newRespone="";
        for(let i=0;i<responseArray.length;i++)
            {
                if(i===0 || i%2!==1) newRespone+=responseArray[i];
                else newRespone+= "<b>" + responseArray[i] + "</b>";
            }
        let newResponse2 = newRespone.split("*").join("<br/>");
        let newResponse3 = newResponse2.split(" ");
        for(let i=0;i<newResponse3.length;i++)
            {
                const nextWord=newResponse3[i];
                delayPara(i,nextWord+ " ");
            }
        setLoading(false);
        setInput(""); 
    }

    const contextValue ={
        input,
        setInput,
        recentPrompt,
        setRecentPrompt,
        prevPrompts,
        setPrevPrompts,
        showResult,
        loading,
        resultData,
        onsent,
        newChat
    }

    
    return (
        <context.Provider value ={contextValue}>
            {props.children}
        </context.Provider>
    )
}

export default ContextProvider;