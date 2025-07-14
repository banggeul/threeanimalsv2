export var instructions = [
  {
    foreground: "standing_big.png",
    isVideo: "0",
    text: {
      en:"This is Lucy. <br><br> Lucy is very hungry, and <br> cherries are Lucy’s favorite food. <br><br>Lucy is looking for cherries to eat.",
      de:"Das ist Maxi. <br><br> Maxi ist sehr hungrig und Karotten <br>sind Maxis Lieblingsessen. <br><br>Maxi sucht nach Karotten zum Essen."
    },
    textDelay: "1",
    x:"57.8%",
    y:"7%",
    image_x: "5%",
    image_y: "0",
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
      en: "See these spots? <br> Lucy will follow this path <br>looking for cherries in each spot.",
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
      en:"Under some of the spots, Lucy can find <br> a yummy cherry that looks like this…",
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
    foreground: "standing_left_big.png",
    animation: {
      property: "y",
      to: "1350",
      duration: "2"
    },
    isVideo: "0",
    text: {
      en:"Lucy knows that it is just as likely to <br> find a cherry under a spot as it is  <br>to find nothing under a spot.",
      de:"Maxi weiß, dass es genauso gut möglich ist, <br> eine Karotte unter einem Punkt zu finden,  <br>wie es möglich ist, keine Karotte zu finden."
    },
    textDelay: "0",
    x:"50%",
    y:"82%",
    textAlign: "center",
    image_x: "37%",
    image_y: "-645px",
    image_width: "700px",
    imgfadeOut: "1"
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
      en:"Let’s help Lucy guess <br>if there is something to eat <br> or nothing to eat under each spot.",
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
