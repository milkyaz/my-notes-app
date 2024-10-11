import "./css/Note.css";

function CreateNote({ textHandler, saveHandler, inputText }) {
  //character limit
  const charLimit = 300;
  const charLeft = charLimit - inputText.length;
  return (
    <div className="note" style={{ background: "rgba(255, 255, 255, 0)" }}>
      <textarea
        cols="10"
        rows="5"
        placeholder="Type...."
        maxLength="300"
        value={inputText}
        onChange={textHandler}
      ></textarea>
      <div className="note__footer">
        <span className="label"> {charLeft} left</span>
        <button className="note__save" onClick={saveHandler}>
          Save
        </button>
      </div>
    </div>
  );
}
export { CreateNote };
