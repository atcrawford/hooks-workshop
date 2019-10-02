import React, { useReducer, useEffect } from "react"

function useKeyDown(key, onKeyDown) {
  // ...
}

function Screen({ children, onSubmit = undefined }) {
  if (onSubmit) {
    return (
      <form onSubmit={onSubmit} className="ui-screen">
        {children}
      </form>
    )
  }

  return <section className="ui-screen">{children}</section>
}

function QuestionScreen({ onClickGood, onClickBad, onClose }) {
  return (
    <Screen>
      <header>How was your experience?</header>
      <button onClick={onClickGood} data-variant="good">
        Good
      </button>
      <button onClick={onClickBad} data-variant="bad">
        Bad
      </button>
      <button title="close" data-testid="close-button" onClick={onClose} />
    </Screen>
  )
}

function FormScreen({ onSubmit, onClose }) {
  return (
    <Screen
      onSubmit={e => {
        e.preventDefault()
        const { response } = e.target.elements

        onSubmit({
          value: response
        })
      }}
    >
      <header>Care to tell us why?</header>
      <textarea
        name="response"
        placeholder="Complain here"
        onKeyDown={e => {
          if (e.key === "Escape") {
            e.stopPropagation()
          }
        }}
      />
      <button>Submit</button>
      <button
        title="close"
        data-testid="close-button"
        type="button"
        onClick={onClose}
      />
    </Screen>
  )
}

function ThanksScreen({ onClose }) {
  return (
    <Screen>
      <header>Thanks for your feedback.</header>
      <button title="close" data-testid="close-button" onClick={onClose} />
    </Screen>
  )
}

function feedbackReducer(state, event) {
  // ...
}

export function Feedback() {
  const [state, dispatch] = useReducer(feedbackReducer, "question")

  switch (state) {
    case "question":
      return (
        <QuestionScreen
          onClickGood={() => dispatch({ type: "GOOD" })}
          onClickBad={() => dispatch({ type: "BAD" })}
          onClose={() => dispatch({ type: "CLOSE" })}
        />
      )
    case "form":
      return (
        <FormScreen
          onSubmit={value => dispatch({ type: "SUBMIT", value })}
          onClose={() => dispatch({ type: "CLOSE" })}
        />
      )
    case "thanks":
      return <ThanksScreen onClose={() => dispatch({ type: "CLOSE" })} />
    case "closed":
    default:
      return null
  }
}

export function App() {
  return (
    <main className="ui-app">
      <Feedback />
    </main>
  )
}