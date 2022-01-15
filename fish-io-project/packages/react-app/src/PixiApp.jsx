import React from "react";
import * as PIXI from "pixi.js";
import tableBackgroundImg from "./table_background.jpg";
class Game extends React.Component {
constructor(props) {
super(props);
this.pixi_cnt = null;
this.app = new PIXI.Application({
width: 626,
height: 362,
transparent: true,
});
}
updatePixiCnt = (element) => {
this.pixi_cnt = element;
if (this.pixi_cnt && this.pixi_cnt.children.length <= 0) {
this.pixi_cnt.appendChild(this.app.view);
this.setup();
}
};
setup = () => {
this.app.loader
.add("tableBackground", tableBackgroundImg)
.load(this.initialize);
console.log("Pixi.js is setting up");
};
initialize = () => {
this.tableBackground = new PIXI.Sprite(
this.app.loader.resources["tableBackground"].texture
);
this.app.stage.addChild(this.tableBackground);
};
render() {
return (
<div
id="pixi"
ref={(element) => {
this.updatePixiCnt(element);
}}
/>
);
}
}
export default Game;
