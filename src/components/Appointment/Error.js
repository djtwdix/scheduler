import React from 'react'

export default function (props) {
  const { message, onClose } = props
  const handleCloseClick = () => {
    onClose()
  }
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{message}</h3>
      </section>
      <img onClick={handleCloseClick}
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
      />
    </main>
  )
}