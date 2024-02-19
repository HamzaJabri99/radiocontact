import React, { Component, createRef } from "react";
import Modal from "./Modal/Modal";
import { CiGift } from "react-icons/ci";

import axios from "axios";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import "./Wheel1.css";
import ConfettiComponent from "./ConfettiComponent";
import spinSound from "/lucky_wheel.mp3";
import winningSound from "/winning.mp3";

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
      name: "5%",
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
      name: "10%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 5,
      sort_order: 5,
      name: "5%",
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
      name: "10%",
      type: "voucher",
      reward_item: true,
    },
    {
      id: 8,
      sort_order: 8,
      name: "5%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 9,
      sort_order: 9,
      name: "5%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 10,
      sort_order: 10,
      name: "10%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 11,
      sort_order: 11,
      name: "5%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 12,
      sort_order: 12,
      name: "5%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 13,
      sort_order: 13,
      name: "5%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 14,
      sort_order: 14,
      name: "10%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 15,
      sort_order: 15,
      name: "5%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 16,
      sort_order: 16,
      name: "5%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 17,
      sort_order: 17,
      name: "10%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 18,
      sort_order: 18,
      name: "10%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 19,
      sort_order: 19,
      name: "5%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 20,
      sort_order: 20,
      name: "5%",
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
      name: "10%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 23,
      sort_order: 23,
      name: "5%",
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
      name: "5%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 26,
      sort_order: 26,
      name: "5%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 27,
      sort_order: 27,
      name: "100€",
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
      name: "5%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 30,
      sort_order: 30,
      name: "10%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 31,
      sort_order: 31,
      name: "5%",
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
      name: "10%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 34,
      sort_order: 34,
      name: "5%",
      type: "wrp",
      reward_item: true,
    },
    {
      id: 35,
      sort_order: 35,
      name: "5%",
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
    segments:[ '5%', '20€', '10€', '5%', '5€', '10€', '10%', '5€', '10€',
     '10%', '5€', '5%', '10%', '20€', '10%', '10€', '5€',
      '5%', '5%', '5%', '5%', '5%', '50€', '10%', '10%',
       '5%', '100€', '10%', '5%', '5€',
        '10%', '20€', '5€', '5€', 
        '50€', '10%'
    ]
  };
   


  audioSpinRef = createRef();
  audioWinningRef = createRef();
  timerHandle = 0;
  timerDelay = 33;
  angleCurrent = 0;
  angleDelta = 0;
  size = 290;
  canvasContext = null;
  colors = [];

  segments = [];

  seg_color = [];
  colors1 = [];
  seg_color1 = [];
  generateColors = (colors, seg_colors) => {
    const repeatedColors = [
      "#0F1920",
      "#FE69B1",
      "#1E808D",
      "#03FFFE",
      "#C51F4A",
      "#2E3E42",
      "#00796B",
      "#8B0000",
    ];

    for (let i = 0; i < 36; i++) {
      let colorIndex = i % repeatedColors.length;
      let color = repeatedColors[colorIndex];
     if(i==26){
      color="#01259E"
     }
      colors.push(color);
      seg_colors.push(color);
    }
  };

  // Cache of segments to colors
  maxSpeed = Math.PI / 16;
  upTime = 500;
  // How long to spin up for (in ms)
  downTime = 8500;
  winningSegment = "";
  // How long to slow down for (in ms)
  spinStart = 0;
  frames = 0;
  centerX = 300;
  centerY = 300;
  claimRewardButtonRef = createRef();
  constructor(props) {
    super(props);
    // if (data.spin_wheel_options && data.spin_wheel_options.length > 0) {
    //   this.segments = data.spin_wheel_options.map((i) => i.name);
    //   this.winningSegment = this.segments[0];
    // }
  }
  componentDidMount() {
    this.generateColors(this.colors, this.seg_color);
    console.log(this.colors1.length);
    axios
      .get("/api/getTrackings.php")
      .then((response) => {
        let vouchers_lessThan0 = response.data.message.filter((item) => {
          return item.winners_count <= 0; // Check if winners_count is less than or equal to 0
        });

        let filtered_lessThan0 = this.state.segments.filter((item) => {
          return !vouchers_lessThan0.some(
            (voucher) => voucher.voucher_value == item
          );
        });
        this.setState({segments: filtered_lessThan0})
        this.wheelInit();
        this.wheelUpdate();
        console.log(this.state)
      });
    // this.wheelInit();
    // this.wheelUpdate();

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
    if (this.state.isPlayedAlready && !this.state.isFinished) {
      this.audioSpinRef.current.play();
    }
    if (!prevState.isFinished && this.state.isFinished) {
      this.audioWinningRef.current.play();
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
      this.maxSpeed = Math.PI / (16 + Math.random()*8);//recent
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
      this.angleDelta = this.maxSpeed * Math.sin((progress * Math.PI) / 10);
    } else {
      progress = duration / this.downTime;
      this.maxSpeed *= 0.992;
      this.angleDelta =
        this.maxSpeed * Math.sin((progress * Math.PI) / 2 + Math.PI / 10);

      if (progress >= 1 || this.maxSpeed < 0.01) finished = true;
    }
    this.angleCurrent += this.angleDelta;
    while (this.angleCurrent >= Math.PI * 2)
      // Keep the angle in a reasonable range
      this.angleCurrent -= Math.PI * 2;

    if (finished) {
      //console.log(this.state);
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

    var segments = this.state.segments;
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
    var len = this.state.segments.length;
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
      this.state.segments.length -
      Math.floor((change / (Math.PI * 2)) * this.state.segments.length) -
      1;

    if (segmentIndex < 0) segmentIndex = segmentIndex + this.state.segments.length;

    // Display value of current segment on the needle
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#fff";
    //ctx.font = "bold 1rem proxima-nova";
    //ctx.fillText("Becharge ", centerX, centerY - 10);
    ctx.font = "bold 2rem proxima-nova";
    ctx.fillText(this.state.segments[segmentIndex], centerX, centerY + 0);
    this.setState({ winner: this.state.segments[segmentIndex] });
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
      //console.log(ipAddress);
      // Generate device fingerprint using FingerprintJS library
      const fp = await FingerprintJS.load();
      const result = await fp.get();

      // Extract a unique identifier for the device
      const deviceFingerprint = result.visitorId;
      //console.log(deviceFingerprint);
      // Include IP address and device fingerprint in the request body
      const requestData = {
        ip_address: ipAddress,
        device_fingerprint: deviceFingerprint,
        claim_reward: { reward: true, prize: this.state.winner },
      };

      // Send request to claim reward with user's IP address and device fingerprint
      const response = await axios.post(
        "/api/create.php",
        requestData,
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
        }
      );
      if (response.status === 404) {
        this.setState({ obtainedError: "invalidCode" });
      }
      // Handle response as needed
      const voucherCode = response.data.message;
      //console.log("Your voucher code is: " + voucherCode);
      this.setState({ voucherCode: voucherCode });
      this.setState({ isOpenModal: true });
    } catch (error) {
      if (error.response.data.alreadyClaimed) {
        this.setState({ obtainedError: "alreadyGotCode" });
      }
      if (error.response.status === 404) {
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
        <audio ref={this.audioSpinRef}>
          <source src={spinSound} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <audio ref={this.audioWinningRef}>
          <source src={winningSound} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
        <div id="wheelContainer">
          <canvas
            id="canvas"
            width="600"
            height="600"
            style={{
              cursor: this.state.isFinished ? "not-allowed" : "pointer",
            }}
          />
          {this.state.isFinished && (
            <div className="reward_container">
              {!this.state.obtainedError && <ConfettiComponent />}
              <h3
                style={{
                  textAlign: "center",
                  color: "green",
                  marginTop: "1rem",
                }}
              >
                {this.props.getTranslation(this.props.lang, "youHaveWon")}
                {this.state.winner} !
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
