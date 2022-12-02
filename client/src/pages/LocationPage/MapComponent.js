import React from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import ReactDOM from "react-dom";
import { YMaps, Map, Clusterer, Placemark } from "react-yandex-maps";
import "./Location.scss";

const mapState = {
  center: [55.345304, 86.099415],
  zoom: 5,
};

class MapComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPoint: null,
      openedDescription: null,
    };
    this.location = props.location
    window.openDescription = (index) => {
      this.setState({ openedDescription: index });
    };
  }
  closeDescription = () => {
    this.setState({ openedDescription: null });
  };

  onPlacemarkClick = (point) => () => {
    this.setState({ selectedPoint: point });
  };

  render() {
    const { selectedPoint, openedDescription } = this.state;
    return (
      <>
        <YMaps className="map" query={{ lang: "ru_RU", load: "package.full" }}>
          <Map
            defaultState={mapState}
            modules={["control.ZoomControl", "control.FullscreenControl"]}
            height="700px"
            width={"100%"}
          >
            <Clusterer
              options={{
                preset: "islands#invertedVioletClusterIcons",
                groupByCoordinates: false,
                balloonPanelMaxMapArea: Infinity,
              }}
              onBalloonclose={this.closeDescription}
            >
              {this.location.map((point, index) => (
                <Placemark
                  modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                  key={point.id}
                  geometry={[point.x_coordination, point.y_coordination]}
                  onClick={this.onPlacemarkClick(point)}
                  properties={{
                    item: index,
                    balloonContentHeader: point.title,
                    balloonContentBody: point.description,
                    balloonContentFooter:
                      !openedDescription || openedDescription !== index
                        ? `<input type="button" onclick="window.openDescription(${index});"value="Показать адрес"/>`
                        : `<div>${point.text_address}</div>`,
                  }}
                  options={{
                    balloonPanelMaxMapArea: Infinity,
                  }}
                />
              ))}
            </Clusterer>
          </Map>
        </YMaps>
      </>
    );
  }
}

export default MapComponent;
