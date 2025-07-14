export var instructions = [
  {
    foreground: "standing_big.png",
    isVideo: "0",
    text: {
      en:"This is Diana. <br><br> Diana is very hungry, and <br> mice are Diana’s favorite food. <br><br>Diana is looking for mice to eat.",
      de:"Das ist Maxi. <br><br> Maxi ist sehr hungrig und Karotten <br>sind Maxis Lieblingsessen. <br><br>Maxi sucht nach Karotten zum Essen."
    },
    textDelay: "1",
    x:"67.8%",
    y:"37%",
    image_x: "12%",
    image_y: "10%",
    textAlign: "center",
    imgfadeOut: "1"
  },
  {
    background: "path.png",
    foreground: "standing_small.png",
    isVideo: "0",
    animation: {
      property: "x",
      to: "350",
      duration: "3"
    },
    text: {
      en: "See these spots? <br> Diana will follow this path <br>looking for mice in each spot.",
      de:"Siehst du diese Punkte? <br>Maxi folgt diesem Pfad und sucht an jedem Punkt nach Karotten."
    },
    textDelay: "2",
    x:"50%",
    y:"82%",
    image_x: "-270px",
    image_y: "8.7%",
    textAlign: "center",
    imgfadeOut: "1"
  },
  {
    background: "flip_bg.png",
    foreground: "flip_yes.mp4",
    isVideo: "1",
    text: {
      en:"Under some of the spots, Diana can find <br> a yummy mouse that looks like this…",
      de:"Unter einigen Punkten findet Maxi  <br> eine leckere Karotte, die so aussieht…"
    },
    textDelay: "0",
    x:"50%",
    y:"84.5%",
    textAlign: "center",
    image_x: "0",
    image_y: "0",
    image_width: "1366px",
    imgfadeOut: "0"
  },
  {
    bgColor: "rgba(0,0,0,0)",
    foreground: "flip_no.mp4",
    isVideo: "1",
    text: {
      en:"...but under some of the spots, <br>she can’t find anything to eat.",
      de:"...aber unter manchen Punkten <br>kann er nichts zu essen finden."
    },
    textDelay: "0",
    x:"50%",
    y:"84.5%",
    textAlign: "center",
    image_x: "1367px",
    image_y: "0",
    image_width: "1366px",
    imgfadeOut: "0"
  },
  {
    bgColor: "rgba(0,0,0,0)",
    foreground: "standing_big.png",
    animation: {
      property: "y",
      to: "1350",
      duration: "2"
    },
    isVideo: "0",
    text: {
      en:"Diana knows that half of the spots have mice in them  and half don’t have mice, but Diana does not know where those mice are. ",
      de:"Maxi weiß, dass es genauso gut möglich ist, <br> eine Karotte unter einem Punkt zu finden,  <br>wie es möglich ist, keine Karotte zu finden."
    },
    textDelay: "0",
    x:"50%",
    y:"76%",
    textAlign: "center",
    image_x: "39%",
    image_y: "-700px",
    image_width: "600px",
    imgfadeOut: "0"
  },
  {
    background: "blank.png",
    isVideo: "0",
    text: {
      en:"Diana also knows that she needs to pay attention to how the mice are distributed along the path to better predict what might happen in the next spot.",
      de:"Maxi weiß, dass es genauso gut möglich ist, <br> eine Karotte unter einem Punkt zu finden,  <br>wie es möglich ist, keine Karotte zu finden."
    },
    textDelay: "0",
    x:"50%",
    y:"76%",
    textAlign: "center",
    image_x: "39%",
    image_y: "650px",
    image_width: "600px",
    imgfadeOut: "0"
  },
  {
    background: "owl_clumpy.png",
    foreground: "standing_big.png",
    isVideo: "0",
    animation: {
      property: "y",
      to: "-400",
      duration: "3"
    },
    text: {
      en:"On some paths mice can be grouped together. Diana will then often find a few mice in a row or a few empty spots in a row. On those paths you can help Diana most by guessing the same thing that she found in the previous spot.",
      de:"Maxi weiß, dass es genauso gut möglich ist, <br> eine Karotte unter einem Punkt zu finden,  <br>wie es möglich ist, keine Karotte zu finden."
    },
    textDelay: "0",
    x:"40%",
    y:"65%",
    textAlign: "left",
    image_x: "19%",
    image_y: "1550px",
    image_width: "500px",
    imgfadeOut: "1"
  },
  {
    background: "owl_dispersed.png",
    foreground: "standing_left_big.png",
    isVideo: "0",
    text: {
      en:"On some paths mice are not grouped together. Diana will then often find a single mouse or a single empty spot in a row. On those paths you can help Diana most by guessing the opposite thing that she found in the previous spot.",
      de:"Maxi weiß, dass es genauso gut möglich ist, <br> eine Karotte unter einem Punkt zu finden,  <br>wie es möglich ist, keine Karotte zu finden."
    },
    textDelay: "0",
    x:"20%",
    y:"65%",
    textAlign: "right",
    image_x: "60%",
    image_y: "1150px",
    image_width: "500px",
    imgfadeOut: "0"
  },
  {
    background: "path.png",
    foreground: "standing_left_big.png",
    animation: {
      property: "y",
      to: "-1317",
      duration: "3"
    },
    isVideo: "0",
    text: {
      en:"Let’s help Diana guess <br>if there is something to eat <br> or nothing to eat under each spot.",
      de:"Hilf Maxi zu erraten, <br> ob es unter den einzelnen Punkten <br>etwas zu essen oder nichts zu essen gibt."
    },
    textDelay: "1",
    x:"30%",
    y:"82%",
    textAlign: "center",
    image_x: "65%",
    image_y: "2113px",
    image_width: "1100px",
    imgfadeOut: "1"
  }
]
