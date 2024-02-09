import React, { Component, createRef } from "react";
import Modal from "./Modal/Modal";
import { CiGift } from "react-icons/ci";

import axios from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import "./Wheel1.css";
import ConfettiComponent from "./ConfettiComponent";

const data = {

  spin_wheel_options: [
    {
      id: 1,
      sort_order: 1,
      name: "100€",
      type: "voucher",
      reward_item: true,
    },
    {
      id: 2,
      sort_order: 2,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 3,
      sort_order: 3,
      name: "50€",
      type: "voucher",
      reward_item: true,
    },
    {
      id: 4,
      sort_order: 4,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 5,
      sort_order: 5,
      name: "55€",
      type: "voucher",
      reward_item: true,
    },
    {
      id: 6,
      sort_order: 6,
      name: "10€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 7,
      sort_order: 7,
      name: "55€",
      type: "voucher",
      reward_item: true,
    },
    {
      id: 8,
      sort_order: 8,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 9,
      sort_order: 9,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 10,
      sort_order: 10,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 11,
      sort_order: 11,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 12,
      sort_order: 12,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 13,
      sort_order: 13,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 14,
      sort_order: 14,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 15,
      sort_order: 15,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 16,
      sort_order: 16,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 17,
      sort_order: 17,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 18,
      sort_order: 18,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 19,
      sort_order: 19,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 20,
      sort_order: 20,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 21,
      sort_order: 21,
      name: "5€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 22,
      sort_order: 22,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 23,
      sort_order: 23,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 24,
      sort_order: 24,
      name: "5€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 25,
      sort_order: 25,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 26,
      sort_order: 26,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 27,
      sort_order: 27,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 28,
      sort_order: 28,
      name: "5€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 29,
      sort_order: 29,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 30,
      sort_order: 30,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 31,
      sort_order: 31,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 32,
      sort_order: 32,
      name: "5€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 33,
      sort_order: 33,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 34,
      sort_order: 34,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 35,
      sort_order: 35,
      name: "55€",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 36,
      sort_order: 36,
      name: "5€",
      type: "wrp",
      reward_item: true,
    },
  ],
  
};

class Wheel1 extends Component {
  state = {
    isPlayedAlready: false,
    winner: "",
    isFinished: false,
    voucherCode: "",
    isOpenModal: false,
    obtainedError: "",
  };
  timerHandle = 0;
  timerDelay = 33;
  angleCurrent = 0;
  angleDelta = 0;
  size = 290;
  canvasContext = null;
  colors = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
    "#815CD1",
    "#3DA5E0",
    "#3CBA5B",
    "#F9AA1F",
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
    "#4A90E2",
    "#FF6347",
    "#00FF7F",
    "#800080",
    "##FF27B4",
    "#8A2BE2",
    "#2E8B57",
    "#815CD1",
    "#3DA5E0",
    "#3CBA5B",
    "#F9AA1F",
    "#FF9000",
    "#815CD1",
    "#3DA5E0",
    "#3CBA5B",
    "#F9AA1F",
  ];

  segments = [];

  seg_color = [
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
    "#815CD1",
    "#3DA5E0",
    "#3CBA5B",
    "#F9AA1F",
    "#EE4040",
    "#F0CF50",
    "#815CD1",
    "#3DA5E0",
    "#34A24F",
    "#F9AA1F",
    "#EC3F3F",
    "#FF9000",
    "#815CD1",
    "#4A90E2",
    "#FF6347",
    "#00FF7F",
    "#800080",
    "#FF27B4",
    "#8A2BE2",
    "#2E8B57",
    "#3DA5E0",
    "#3CBA5B",
    "#F9AA1F",
    "#FF9000",
    "#815CD1",
    "#3DA5E0",
    "#3CBA5B",
    "#F9AA1F",
  ];
  // Cache of segments to colors
  maxSpeed = Math.PI / 16;
  upTime = 500;
  // How long to spin up for (in ms)
  downTime = 10000;
  winningSegment = "";
  // How long to slow down for (in ms)
  spinStart = 0;
  frames = 0;
  centerX = 300;
  centerY = 300;
  claimRewardButtonRef = createRef();
  constructor(props) {
    super(props);
    if (data.spin_wheel_options && data.spin_wheel_options.length > 0) {
      this.segments = data.spin_wheel_options.map((i) => i.name);
      this.winningSegment = this.segments[0];
    }
  }
  componentDidMount() {
    //console.log("winning segment should be " + this.winningSegment);
    if (data.spin_wheel_options && data.spin_wheel_options.length > 0) {
      this.segments = data.spin_wheel_options.map((i) => i.name);
    }
    this.wheelInit();
    this.wheelUpdate();

    //Hide the address bar (for mobile devices)!
    setTimeout(() => {
      window.scrollTo(0, 1);
    }, 0);
  }
  componentDidUpdate(prevProps, prevState) {
    // Scroll to the button when isFinished becomes true
    if (
      prevState.isFinished !== this.state.isFinished &&
      this.state.isFinished
    ) {
      this.scrollToButton();
    }
  }

  scrollToButton() {
    if (this.claimRewardButtonRef.current) {
      this.claimRewardButtonRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }

  wheelInit = () => {
    this.initWheel();
    this.initCanvas();
    this.wheelDraw();
  };

  shuffle = (o) => {
    for (
      var j, x, i = o.length;
      i;
      j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  };

  initWheel = () => {
    this.shuffle(this.colors);
  };
  initCanvas = () => {
    var canvas = document.getElementById("canvas");
    if (navigator.appVersion.indexOf("MSIE") !== -1) {
      canvas = document.createElement("canvas");
      canvas.setAttribute("width", 1000);
      canvas.setAttribute("height", 600);
      canvas.setAttribute("id", "canvas");
      document.getElementById("wheel").appendChild(canvas);
      //   canvas = G_vmlCanvasManager.initElement(canvas);
    }
    canvas.addEventListener("click", this.spin, false);
    this.canvasContext = canvas.getContext("2d");
  };

  spin = () => {
    this.setState({
      isPlayedAlready: true,
    });
    // Start the wheel only if it's not already spinning
    if (this.timerHandle === 0 && !this.state.isFinished) {
      this.spinStart = new Date().getTime();
      this.maxSpeed = Math.PI / (16 + Math.random());
      this.frames = 0;
      this.timerHandle = setInterval(this.onTimerTick, this.timerDelay);
    }
  };

  onTimerTick = () => {
    this.frames++;

    this.draw();
    var duration = new Date().getTime() - this.spinStart;
    var progress = 0;
    var finished = false;

    if (duration < this.upTime) {
      progress = duration / this.upTime;
      this.angleDelta = this.maxSpeed * Math.sin((progress * Math.PI) / 2);
    } else {
      progress = duration / this.downTime;
      this.angleDelta =
        this.maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 2);

      if (progress >= 1) finished = true;
    }
    this.angleCurrent += this.angleDelta;
    while (this.angleCurrent >= Math.PI * 2)
      // Keep the angle in a reasonable range
      this.angleCurrent -= Math.PI * 2;

    if (finished) {
      console.log(this.state);
      this.setState({
        isFinished: true,
      });
      clearInterval(this.timerHandle);
      this.timerHandle = 0;
      this.angleDelta = 0;
    }
  };

  wheelDraw = () => {
    this.clear();
    this.drawWheel();
    this.drawNeedle();
  };

  draw = () => {
    this.clear();
    this.drawWheel();
    this.drawNeedle();
  };

  drawSegment = (key, lastAngle, angle) => {
    var ctx = this.canvasContext;
    var centerX = this.centerX;
    var centerY = this.centerY;
    var size = this.size;

    var segments = this.segments;
    //   var len = this.segments.length;
    var colors = this.seg_color;

    var value = segments[key];
    ctx.save();
    ctx.beginPath();

    // Start in the centre
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, size, lastAngle, angle, false); // Draw a arc around the edge
    ctx.lineTo(centerX, centerY); // Now draw a line back to the centre
    // Clip anything that follows to this area
    //ctx.clip(); // It would be best to clip, but we can double performance without it
    ctx.closePath();

    ctx.fillStyle = colors[key];
    ctx.fill();
    ctx.stroke();

    // Now draw the text
    ctx.save(); // The save ensures this works on Android devices
    ctx.translate(centerX, centerY);
    ctx.rotate((lastAngle + angle) / 2);

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 1.5rem proxima-nova";
    ctx.fillText(value.substr(0, 20), size / 2 + 20, 0);
    ctx.restore();

    ctx.restore();
  };

  drawWheel = () => {
    var ctx = this.canvasContext;

    var angleCurrent = this.angleCurrent;
    var lastAngle = angleCurrent;
    //   var segments = this.segments;
    var len = this.segments.length;
    //   var colors = this.colors;
    //    var colorsLen = this.colors.length;

    var centerX = this.centerX;
    var centerY = this.centerY;
    var size = this.size;

    var PI2 = Math.PI * 2;

    ctx.lineWidth = 1;
    ctx.strokeStyle = "#131848";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.font = "1em proxima-nova";

    for (var i = 1; i <= len; i++) {
      var angle = PI2 * (i / len) + angleCurrent;
      this.drawSegment(i - 1, lastAngle, angle);
      lastAngle = angle;
    }
    // Draw a center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, PI2, false);
    ctx.closePath();

    ctx.fillStyle = "#131848";
    ctx.lineWidth = 10;
    ctx.strokeStyle = "#ffffff";

    ctx.fill();
    ctx.stroke();

    // Draw outer circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, size, 0, PI2, false);
    ctx.closePath();

    ctx.lineWidth = 10;
    ctx.strokeStyle = "#131848";
    ctx.stroke();
  };

  drawNeedle = () => {
    var ctx = this.canvasContext;
    var centerX = this.centerX;
    var centerY = this.centerY;
    var size = this.size;

    // Clear canvas
    //ctx.clearRect(0, 0, 1000, 800);

    // Draw needle
    ctx.beginPath();
    ctx.moveTo(centerX + 20, centerY - 30);
    ctx.lineTo(centerX - 20, centerY - 30);
    ctx.lineTo(centerX, centerY - 70);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fill();

    // Calculate current segment index
    var change = this.angleCurrent + Math.PI / 2;
    var segmentIndex =
      this.segments.length -
      Math.floor((change / (Math.PI * 2)) * this.segments.length) -
      1;

    if (segmentIndex < 0) segmentIndex = segmentIndex + this.segments.length;

    // Display value of current segment on the needle
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    ctx.font = "bold 1rem proxima-nova";
    ctx.fillText("Becharge ", centerX, centerY - 10);
    ctx.font = "bold 2rem proxima-nova";
    ctx.fillText(this.segments[segmentIndex], centerX, centerY + 20);
    this.setState({ winner: this.segments[segmentIndex] });
  };

  clear = () => {
    var ctx = this.canvasContext;
    ctx.clearRect(0, 0, 1000, 800);
  };
  wheelUpdate = () => {};
  handleClaimReward = async () => {
    try {
      // Fetch user's IP address
      const ipResponse = await axios.get("https://api64.ipify.org?format=json");
      const ipAddress = ipResponse.data.ip;
      console.log(ipAddress);
      // Generate device fingerprint using FingerprintJS library
      const fp = await FingerprintJS.load();
      const result = await fp.get();

      // Extract a unique identifier for the device
      const deviceFingerprint = result.visitorId;
      console.log(deviceFingerprint);
      // Include IP address and device fingerprint in the request body
      const requestData = {
        ip_address: ipAddress,
        device_fingerprint: deviceFingerprint,
        claim_reward: { reward: true, prize: this.state.winner },
      };

      // Send request to claim reward with user's IP address and device fingerprint
      const response = await axios.post(
        "http://localhost/radiocontact/backend/create.php",
        requestData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      if(response.status===404){
        this.setState({ obtainedError: "invalidCode" });
      }
      // Handle response as needed
      const voucherCode = response.data.message;
      console.log("Your voucher code is: " + voucherCode);
      this.setState({ voucherCode: voucherCode });
      this.setState({ isOpenModal: true });
      
    } catch (error) {

      if (error.response.data.alreadyClaimed) {
        this.setState({ obtainedError: "alreadyGotCode" });
      }
      if(error.response.status===404){
        this.setState({ obtainedError: "invalidCode" });
      }
      // Handle error
    }
  };
  handleSetOpen = () => {
    this.setState({ isOpenModal: false });
  };

  render() {
    return (
      <React.Fragment>
        <div id="wheelContainer">
          <canvas id="canvas" width="600" height="600" style={{cursor:this.state.isFinished?"not-allowed":"pointer"}}/>
          {this.state.isFinished && (
            <div className="reward_container">
              {!this.state.obtainedError&&<ConfettiComponent />}
              <h3 style={{ textAlign: "center", color: "green", marginTop:"1rem"}}>
                {this.props.getTranslation(this.props.lang,"youHaveWon")}{this.state.winner} !
              </h3>
              <button
                onClick={this.handleClaimReward}
                ref={this.claimRewardButtonRef}
                className="claimReward_btn"
              >
                <CiGift size={50} className="cadeau" />

                {this.props.getTranslation(this.props.lang, "getReward")} !
              </button>
              <p style={{ color: "red" }}>
                {this.state.obtainedError &&
                  this.props.getTranslation(
                    this.props.lang,
                    this.state.obtainedError
                  )}
              </p>
            </div>
          )}
        </div>
        {this.state.isOpenModal && (
          <Modal
            lang={this.props.lang}
            getTranslations={this.props.getTranslation}
            voucherAmount={this.state.winner}
            voucherCode={this.state.voucherCode}
            setIsOpen={this.handleSetOpen}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Wheel1;
