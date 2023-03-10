import { useState } from 'react';
import uniqid from 'uniqid';
import Info from "./components/Info";
import Contact from "./components/Contact";
import Education from "./components/Education";
import Work from "./components/Work";
import Skills from "./components/Skills";
import Navigator from "./components/Navigator";
import Button from "../Button";
import GithubButton from "./components/GithubButton";
import {
  RiEditLine,
  RiSaveLine,
  RiEyeLine,
  RiCodeLine,
} from 'react-icons/ri';
import '../../styles/Editor.css';

const editors = [
  { name: 'Info' },
  { name: 'Contact' },
  { name: 'Education' },
  { name: 'Work' },
  { name: 'Skills' },
];
editors.forEach(editor => editor.key = uniqid());

function Editor(props) {
  const {
    data,
    setData,
    autofill,
    getImage,
    togglePreview,
  } = props;
  const [activeEditor, setActiveEditor] = useState(0);
  const [isPreviewVisible, togglePreviewVisible] = useState(false);
  const autofillButton = (
    <Button
      icon={<RiEditLine />}
      label="Autofill"
      handleClick={() => {
        autofill();
        setActiveEditor(editors.length - 1);
      }}
    />
  );
  const saveButton = (
    <Button
      icon={<RiSaveLine />}
      label="Save"
      handleClick={getImage}
    />
  );
  let editor;

  switch (editors[activeEditor].name) {
    case 'Info':
      editor = <Info data={data} setData={setData} />;
      break;
    case 'Contact':
      editor = <Contact data={data} setData={setData} />;
      break;
    case 'Education':
      editor = <Education data={data} setData={setData} />;
      break;
    case 'Work':
      editor = <Work data={data} setData={setData} />;
      break;
    case 'Skills':
      editor = <Skills data={data} setData={setData} />;
      break;
    default:
  }

  return (
    <div className="Editor">
      <h3>{editors[activeEditor].name}</h3>
      {editor}
      <Navigator
        index={activeEditor}
        setIndex={setActiveEditor}
        items={editors}
        firstButton={autofillButton}
        lastButton={saveButton}
      />
      <GithubButton username="abubakkariiui" />
      <Button
        className="PreviewButton"
        icon={isPreviewVisible ? <RiCodeLine /> : <RiEyeLine />}
        label={isPreviewVisible ? 'Editor' : 'Preview'}
        handleClick={() => {
          togglePreviewVisible(prevState => !prevState);
          togglePreview();
        }}
      />
    </div>
  );
}

export default Editor;
