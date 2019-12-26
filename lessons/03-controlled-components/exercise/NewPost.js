import React, { useState, useEffect } from "react"
import { useAppState } from "app/app-state"
import Avatar from "app/Avatar"
import Minutes from "app/Minutes"
import { FaDumbbell } from "react-icons/fa"
import RecentPostsDropdown from "app/RecentPostsDropdown"

const errorClass = "NewPost_error"

const MAX_MESSAGE_LENGTH = 20

export default function NewPost({ takeFocus, date, onSuccess, showAvatar }) {
  const [{ auth }] = useAppState()
  const [message, setMessage] = useState("Some default state")
  const messageTooLong = message.length > MAX_MESSAGE_LENGTH

  const handleMessageChange = event => {
    setMessage(event.target.value)
  }

  const handleRecentPostsSelect = (message) => {
    setMessage(message)
  }
  
  return (
    <div className={"NewPost" + (messageTooLong ? ` ${errorClass}` : "")}>
      {showAvatar && <Avatar uid={auth.uid} size={70} />}
      <form className="NewPost_form">
        <textarea
          className="NewPost_input"
          placeholder="Tell us about your workout!"
          value={message}
          onChange={handleMessageChange}
        />
        <div className="NewPost_char_count">
          {message.length}/{MAX_MESSAGE_LENGTH}
        </div>
        <RecentPostsDropdown uid={auth.uid} onSelect={handleRecentPostsSelect}/>
        <div className="NewPost_buttons">
          <Minutes date={date} />
          <div>
            <button type="submit" className="icon_button cta">
              <FaDumbbell /> <span>Post</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
