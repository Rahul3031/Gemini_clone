import React, { useContext } from 'react';
import './Main.css';
import { assets } from '../../assets/assets';
import { context } from '../../context/Context';
const Main = () => {

    const {input,setInput,recentPrompt,setRecentPrompt,prevPrompts,setPrevPrompts,showResult,loading,resultData,onsent} = useContext(context);
    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onsent(prompt);
      }

  return (
    <div className="Main">
        <div className="nav">
            <p>Gemini</p>
            <img src={assets.user_icon} alt="" />
        </div>
        <div className="main-container">

            {!showResult
            ? <>
                        <div className="greet">
                <p><span>Hello Div.</span></p>
                <p>How can I help you today?</p>
            </div>
            <div className="cards">
                <div onClick={()=>loadPrompt("Suggest beautiful places to see on upcoming road trip")} className="card">
                    <p>Suggest beautiful places to see on upcoming road trip</p>
                    <img src={assets.compass_icon} alt="" />
                </div>
                <div onClick={()=>loadPrompt("Briefly summarize this concept: urban planning")} className="card">
                    <p>Briefly summarize this concept: urban planning</p>
                    <img src={assets.bulb_icon} alt="" />
                </div>
                <div onClick={()=>loadPrompt("Brainstorm team bonding activities for our work retreat")} className="card">
                    <p>Brainstorm team bonding activities for our work retreat</p>
                    <img src={assets.message_icon} alt="" />
                </div>
                <div onClick={()=>loadPrompt("Improve the readability of the following code")} className="card">
                    <p>Improve the readability of the following code</p>
                    <img src={assets.code_icon} alt="" />
                </div>
            </div>
            </>
            : <div className="result">
                <div className="result-title">
                    <img src={assets.user_icon} alt="" />
                    <p>{recentPrompt}</p>
                </div>
                <div className="result-data">
                    <img src={assets.gemini_icon} alt="" />
                    {loading
                    ? <div className="loader">
                        <hr />
                        <hr />
                        <hr />
                    </div>
                    : <p dangerouslySetInnerHTML={{__html:resultData}}></p> 
                    }
                </div>
            </div>
            }
            <div className="main-bottom">
                <div className="search-box">
                    <input onChange={(evt)=>setInput(evt.target.value)} value={input} type="text" placeholder='Enter the prompt here' />
                    <div>
                        <img src={assets.gallery_icon} alt="" />
                        <img src={assets.mic_icon} alt="" />
                        {input?<img onClick={()=>onsent()} src={assets.send_icon} alt="" />: null}
                    </div>
                </div>
                <div className="bottom-info">
                    <p>Gemini may display inaccurate info, including about people, so double-check its responses. Your privacy and Gemini Apps</p>
                </div>
            </div> 
        </div>
    </div>
  )
}

export default Main