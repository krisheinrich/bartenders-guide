import { Component }from "react";
import * as ReactDOM from "react-dom";

export class LazyImage extends Component {
  constructor(props) {
    super(props);

    this.imgEl = null;
    this.wrapper = null;
    this.observer  = null;

    this.state = {
      hasLoaded: false,
      aspectRatio: 1
    };
  }

  componentDidMount() {
    this.observer = getImageLoaderObserver();
  }

  componentWillUnmount() {
    if (this.observer && this.wrapper) {
      // prevent memory leaks
      this.observer.unobserve(this.wrapper);
    }
  }

  addImageToObserver = () => {
    if (this.observer && this.wrapper) {
      this.observer.observe(this.wrapper);
    } else if (this.imgEl && this.props.src) {
      // for browser compatibility
      this.imgEl.src = this.props.src;
    }
  };

  onRefStored = () => {
    if (this.wrapper && this.imgEl) {
      window.requestAnimationFrame(this.addImageToObserver);
    }
  };

  setWrapperRef = el => {
    this.wrapper = ReactDOM.findDOMNode(el);
    this.onRefStored();
  };

  setImgRef = el => {
    this.imgEl = ReactDOM.findDOMNode(el);
    this.onRefStored();
  };

  onImageLoad = () => {
    const { width, height } = this.imgEl.getBoundingClientRect();

    this.setState({ hasLoaded: true, aspectRatio: width/height });
    if (this.props.onLoad) {
      this.props.onLoad();
    }
  };

  render() {
    const {
      src, className = "", withPlaceholder = true, ...imgProps
    } = this.props;
    const { hasLoaded, aspectRatio } = this.state;

    return (
      <div ref={this.setWrapperRef} className={className}>
        <img {...imgProps}
          onLoad={this.onImageLoad}
          ref={this.setImgRef}
          data-src={src}
          style={{
            width: "100%",
            height: "auto",
            opacity: hasLoaded ? 1 : 0,
            transition: "opacity 300ms ease",
            position: withPlaceholder ? "absolute" : "static",
            left: 0,
            top: 0
          }}
        />
        { withPlaceholder && (
          <div
            style={{
              width: "100%",
              paddingTop: `${aspectRatio * 100}%`,
              opacity: hasLoaded ? 0 : 1,
              transition: "opacity 300ms ease",
              pointerEvents: 'none'
            }}
          />
        ) }
      </div>
    );
  }
}

const CACHE_KEY = "__LAZY_IMAGE_INTERSECTION_OBSERVER__";

// IntersectionObserver cached for performance
function getImageLoaderObserver() {
  if (typeof IntersectionObserver === "undefined") {
    return null;
  }

  if (typeof window[CACHE_KEY] !== "undefined") {
    return window[CACHE_KEY];
  }

  const threshold = 0.1;  // load the image when 10% in view
  window[CACHE_KEY] = new IntersectionObserver(
    entries => {
      entries.map(entry => {
        const img = entry.target.querySelector("img");
        if (img && !img.src && entry.intersectionRatio >= threshold) {
          const src = img.getAttribute("data-src");
          if (src) {
            img.src = src;
          }
        }
      });
    },
    {
      threshold
    }
  );

  return window[CACHE_KEY];
}

export default LazyImage;
