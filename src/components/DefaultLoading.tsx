import { PureComponent } from "react";
import { Spring, animated } from "react-spring";

class Loading extends PureComponent {
  static style = ({ props }: { props: any }) => ({
    border: "10px solid white",
    borderRadius: "100%",
    height: props.diameter,
    left: "50%",
    opacity: props.opacity,
    position: "absolute",
    top: "50%",
    transform: "translateX(-50%) translateY(-50%)",
    width: props.diameter,
    zIndex: 1,
  });

  handleRest = () => {
    this.forceUpdate();
  };

  render() {
    return (
      <Spring
        reset
        from={{ opacity: 1, diameter: 0 }}
        to={{ opacity: 0, diameter: 150 }}
        config={{ duration: 1000 }}
        onRest={this.handleRest}
      >
        {(props) => <animated.div style={Loading.style({ props })} />}
      </Spring>
    );
  }
}

export default Loading;
