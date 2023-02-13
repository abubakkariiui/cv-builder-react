function Visualizer(props) {
  const {
    state,
    image,
    toggleVisualizer,
  } = props;

  return (
    <div
      className={`Visualizer ${state}`}
      onClick={() => toggleVisualizer(false)}
    >
      <img src={image} alt="img-preview" />
    </div>
  );
}

export default Visualizer;
