
var widthOffset = window.outerWidth - window.innerWidth;
var width = document.getElementById("cam").clientWidth + widthOffset;

var viewer = new MJPEGCANVAS.Viewer({
  divID : 'cam',
  host : 'localhost',
  width : width,
  height : 320,
  topic : '/wide_stereo/left/image_color'
});
