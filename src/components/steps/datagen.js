
// The DataGen flip-side of the right pane of the split screen
// Not currently in use (as of 7/10/2023)

export default function BodyDatagen( { onClick } ) {
    return (
      <body className="App-body data">
        <div className="flexbox Flex-datagen">
          <button className="button datagen back" onClick={onClick}>
              Back
          </button>
          <h3>
            This is DataGen
          </h3>
        </div>
      </body>
    )
  }