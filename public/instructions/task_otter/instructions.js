export var instructions = [
  {
    foreground: "standing_right_big.png",
    isVideo: "0",
    text: {
      en:"This is Sasha. <br><br> Sasha is very hungry, and fish <br>are Sasha's favorite food. <br><br>Sasha is looking for fish to eat.",
      de:"Das ist Maxi. <br><br> Maxi ist sehr hungrig und Karotten <br>sind Maxis Lieblingsessen. <br><br>Maxi sucht nach Karotten zum Essen."
    },
    textDelay: "1",
    x:"60%",
    y:"50%",
    image_x: "10%",
    image_y: "250px",
    textAlign: "left",
    imgfadeOut: "1"
  },
  {
    background: "path.png",
    foreground: "standing_right_small.png",
    isVideo: "0",
    animation: {
      property: "x",
      to: "350",
      duration: "3"
    },
    text: {
      en: "See these spots? <br> Sasha will follow a path <br>looking for fish in each spot.",
      de:"Siehst du diese Punkte? <br>Maxi folgt diesem Pfad und sucht an jedem Punkt nach Karotten."
    },
    textDelay: "2",
    x:"50%",
    y:"82%",
    image_x: "-250px",
    image_y: "8.7%",
    textAlign: "center",
    imgfadeOut: "1"
  },
  {
    background: "flip_bg.png",
    foreground: "flip_yes.mp4",
    isVideo: "1",
    text: {
      en:"Under some of the spots, Sasha can find <br> a yummy fish that looks like this…",
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
      en:"...but under some of the spots, <br>he can’t find anything to eat.",
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
    foreground: "standing_right_big.png",
    animation: {
      property: "y",
      to: "1350",
      duration: "2"
    },
    isVideo: "0",
    text: {
      en:"Sasha knows that half of the spots have fish in them  and half don’t have fish, but Sasha does not know where those fish are. ",
      de:"Maxi weiß, dass es genauso gut möglich ist, <br> eine Karotte unter einem Punkt zu finden,  <br>wie es möglich ist, keine Karotte zu finden."
    },
    textDelay: "0",
    x:"50%",
    y:"76%",
    textAlign: "center",
    image_x: "39%",
    image_y: "-600px",
    image_width: "600px",
    imgfadeOut: "0"
  },
  {
    background: "blank.png",
    isVideo: "0",
    text: {
      en:"Sasha also knows that she needs to pay attention to how the fish are distributed along the path to better predict what might happen in the next spot.",
      de:"Maxi weiß, dass es genauso gut möglich ist, <br> eine Karotte unter einem Punkt zu finden,  <br>wie es möglich ist, keine Karotte zu finden."
    },
    textDelay: "0",
    x:"50%",
    y:"76%",
    textAlign: "center",
    image_x: "39%",
    image_y: "750px",
    image_width: "600px",
    imgfadeOut: "0"
  },
  {
    background: "otter_clumpy.png",
    foreground: "standing_right_big.png",
    isVideo: "0",
    animation: {
      property: "y",
      to: "-300",
      duration: "3"
    },
    text: {
      en:"On some paths fish can be grouped together. Sasha will then often find a few fish in a row or a few empty spots in a row. On those paths you can help Sasha most by guessing the same thing that she found in the previous spot.",
      de:"Maxi weiß, dass es genauso gut möglich ist, <br> eine Karotte unter einem Punkt zu finden,  <br>wie es möglich ist, keine Karotte zu finden."
    },
    textDelay: "0",
    x:"40%",
    y:"65%",
    textAlign: "left",
    image_x: "19%",
    image_y: "1650px",
    image_width: "500px",
    imgfadeOut: "1"
  },
  {
    background: "otter_dispersed.png",
    foreground: "standing_left_big.png",
    isVideo: "0",
    text: {
      en:"On some paths fish are not grouped together. Sasha will then often find a single fish or a single empty spot in a row. On those paths you can help Sasha most by guessing the opposite thing that she found in the previous spot.",
      de:"Maxi weiß, dass es genauso gut möglich ist, <br> eine Karotte unter einem Punkt zu finden,  <br>wie es möglich ist, keine Karotte zu finden."
    },
    textDelay: "0",
    x:"20%",
    y:"65%",
    textAlign: "right",
    image_x: "60%",
    image_y: "1250px",
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
      en:"Let’s help Sasha guess <br>if there is something to eat <br> or nothing to eat under each spot.",
      de:"Hilf Maxi zu erraten, <br> ob es unter den einzelnen Punkten <br>etwas zu essen oder nichts zu essen gibt."
    },
    textDelay: "1",
    x:"30%",
    y:"82%",
    textAlign: "center",
    image_x: "47%",
    image_y: "1794px",
    image_width: "2000px",
    imgfadeOut: "1"
  }
]
