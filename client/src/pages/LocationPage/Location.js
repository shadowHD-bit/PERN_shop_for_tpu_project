import React from "react";
import ReactDOM from "react-dom";
import { YMaps, Map, Clusterer, Placemark } from "react-yandex-maps";

import POINTS from "./points";

const mapState = {
  center: [55.345304, 86.099415],
  zoom: 5
};

class listShop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedPoint: null,
      openedDescription: null
    };
    window.openDescription = index => {
      this.setState({ openedDescription: index });
    };
  }

  closeDescription = () => {
    this.setState({ openedDescription: null });
  };

  onPlacemarkClick = point => () => {
    this.setState({ selectedPoint: point });
  };

  render() {
    const { selectedPoint, openedDescription } = this.state;

    return (
      <div className="listShop">
        <YMaps query={{ lang: "ru_RU", load: "package.full" }}>
          <Map
            defaultState={mapState}
            modules={["control.ZoomControl", "control.FullscreenControl"]}
            height='700px'
            width={'100%'}
          >
            <Clusterer
              options={{
                preset: "islands#invertedVioletClusterIcons",
                groupByCoordinates: false,
                balloonPanelMaxMapArea: Infinity
              }}
              onBalloonclose={this.closeDescription}
            >
              {POINTS.map((point, index) => (
                <Placemark
                  modules={["geoObject.addon.balloon", "geoObject.addon.hint"]}
                  key={index}
                  geometry={point.coords}
                  onClick={this.onPlacemarkClick(point)}
                  properties={{
                    item: index,
                    balloonContentHeader: point.title,
                    balloonContentBody: point.maindescr,
                    balloonContentFooter:
                      !openedDescription || openedDescription !== index
                        ? `<input type="button" onclick="window.openDescription(${index});"value="Показать адрес"/>`
                        : `<div>${point.descr}</div>`
                  }}
                  options={{
                    balloonPanelMaxMapArea: Infinity
                  }}
                />
              ))}
            </Clusterer>
          </Map>
        </YMaps>
      </div>
    );
  }
}

export default listShop
