import React from 'react';
import "./styles.css"
import { FaWhatsapp } from 'react-icons/fa'

export default function ChatWidget() {
    return (
        <div className="zap_widget">
            <a className="blantershow-chat" title="Show Chat" href="https://api.whatsapp.com/send?phone=919873971865&text=Hii%21%20There."><i className="fab fa-whatsapp" />Contact Us</a>
        </div>
    )
}