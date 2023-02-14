import { createRef, useState } from "react";
import { useTransition } from "react-transition-state";
import { useScreenshot } from "use-react-screenshot";
import uniqid from "uniqid";
import { saveAs } from "file-saver";
import Editor from "./components/Editor";
import Preview from "./components/Preview";
import generateData from "./utils/generateData";
import "./styles/App.css";

function App() {
  const createItems = (count) => {
    return Array(count)
      .fill()
      .map(() => ({ key: uniqid() }));
  };
  const [data, setData] = useState({
    info: {},
    contact: {},
    education: createItems(1),
    work: createItems(1),
    skills: createItems(3),
  });
  const screenshotRef = createRef(null);
  const transformRef = createRef(null);
  const [, takeScreenshot] = useScreenshot({ type: "image/jpg", quality: 1.0 });
  const [previewState, togglePreview] = useTransition({ timeout: 300 });
  const getImage = () => {
    transformRef.current?.centerView(1, 0);
    takeScreenshot(screenshotRef.current).then(saveAs);
  };
  return (
    <div className="App">
      <Editor
        data={data}
        setData={setData}
        getImage={getImage}
        autofill={() => setData(generateData())}
        togglePreview={togglePreview}
      />
      <Preview
        data={data}
        screenshotRef={screenshotRef}
        transformRef={transformRef}
        state={previewState}
      />
    </div>
  );
}

export default App;
