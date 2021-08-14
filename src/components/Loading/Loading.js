import "./Loading.css";
import cat4 from "../../images/cat4.gif";
function Loading() {
    return (
      <div className="bodyall pb-5 mt-5 pt-5 " id="loading-cat">
        <img src={cat4} width={100} />
        <h4 className="text-light">Loading...</h4>
      </div>
    );
}
export default Loading