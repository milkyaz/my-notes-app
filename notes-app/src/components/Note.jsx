import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import "./css/Note.css";

function Note({ id, text, deleteNote }) {
  return (
    <>
      <div className="note">
        <div className="note__body">{text}</div>
        <div className="note__footer" style={{ justifyContent: "flex-end" }}>
          <DeleteForeverOutlinedIcon
            className="note__delete"
            aria-hidden="true"
            onClick={() => deleteNote(id)}
          ></DeleteForeverOutlinedIcon>
        </div>
      </div>
    </>
  );
}

export { Note };
