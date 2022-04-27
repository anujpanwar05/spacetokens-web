import "./style.css";
import React, { useState } from "react";

import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestIcon,
  PinterestShareButton,
  RedditIcon,
  RedditShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton
} from "react-share";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 10,
    borderColor: '#fff7d0',
    border: 1, 
    padding: 24,
    backgroundColor: 'rgba(41, 52, 100, 0.96)'
  },
  overlay:{
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  }
};

Modal.setAppElement('#root');

function ShareModal(props) {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }

  function closeModal() {
    setIsOpen(false);
  }

  const [btnClicked, setBtnClicked] = useState(false);
  const copyClick = () => {
    setBtnClicked(true)
    setTimeout(() => {
      setBtnClicked(false)
    }, 2500)
  }

  const iconSize = 42
  const { shareUrl, shareText = '', shareImgUrl = '' } = props
  return (
    <div>
      <button className="btn-share" onClick={openModal}>Share Discovery!</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div>
          <h4 className="share-title">Discovery Permalink:</h4>
        </div>
        <div className="btn-share-url" onClick={() => {
          navigator.clipboard.writeText(shareUrl)
          copyClick()
        }}>
          {!btnClicked &&
            <a href="#" style={{textDecoration:'none', color: "#102479"}}>
              <div className="share-link">{shareUrl}</div>
            </a>
          }
          {btnClicked && 
            <div style={{textAlign: 'center'}}>Copied to Clipboard!</div>
          }
        </div>

        <div>
          <h4 className="share-title">Share to other Earthlings:</h4>
        </div>
        
        {/* Facebook */}
        <FacebookShareButton
            url={shareUrl}
            quote={shareText}
            className="btn-share-type"
          >
            <FacebookIcon size={iconSize} round />
        </FacebookShareButton>

        {/* Twitter */}
        <TwitterShareButton
            url={shareUrl}
            title={shareText}
            className="btn-share-type"
          >
            <TwitterIcon size={iconSize} round />
        </TwitterShareButton>

        {/* Telegram */}
        <TelegramShareButton
            url={shareUrl}
            title={shareText}
            className="btn-share-type"
          >
            <TelegramIcon size={iconSize} round />
        </TelegramShareButton>

        {/* Whatsapp */}
        <WhatsappShareButton
            url={shareUrl}
            title={shareText}
            separator=":: "
            className="btn-share-type"
          >
            <WhatsappIcon size={iconSize} round />
        </WhatsappShareButton>

        {/* Pinterest */}
        <PinterestShareButton
            url={shareUrl}
            media={shareImgUrl}
            className="btn-share-type"
          >
            <PinterestIcon size={iconSize} round />
        </PinterestShareButton>
        
        {/* Reddit */}
        <RedditShareButton
            url={shareUrl}
            title={shareText}
            windowWidth={660}
            windowHeight={460}
            className="btn-share-type"
          >
            <RedditIcon size={iconSize} round />
        </RedditShareButton>

        {/* Email */}
        <EmailShareButton
            url={shareUrl}
            subject={shareText}
            body=""
            className="btn-share-type"
          >
            <EmailIcon size={iconSize} round />
        </EmailShareButton>

        {/* <button onClick={closeModal}>close</button> */}
      </Modal>
    </div>
  )
}

export default ShareModal