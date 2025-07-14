export var instructions = [
  {
    background: "animal_friends.png",
    isVideo: "0",
    text: {
      en:"This is Pippa, Diana and Sasha. <br><br> You will be guessing what they may find <br> as they travel along their path to find food.",
      de:"Das ist Maxi. <br><br> Maxi ist sehr hungrig und Karotten <br>sind Maxis Lieblingsessen. <br><br>Maxi sucht nach Karotten zum Essen."
    },
    textDelay: "1",
    x:"50%",
    y:"70%",
    image_x: "5%",
    image_y: "0",
    textAlign: "center",
    imgfadeOut: "1"
  },
  {
    foreground: "standing_big.png",
    isVideo: "0",
    text: {
      en:"This is Pippa. <br><br> Pippa is very hungry, and ladybugs <br>are Pippa’s favorite food. <br><br>Pippa is looking for ladybugs to eat.",
      de:"Das ist Maxi. <br><br> Maxi ist sehr hungrig und Karotten <br>sind Maxis Lieblingsessen. <br><br>Maxi sucht nach Karotten zum Essen."
    },
    textDelay: "1",
    x:"55%",
    y:"40%",
    image_x: "15%",
    image_y: "15%",
    image_width:"40%",
    textAlign: "left",
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
      en: "See these spots? <br> Pippa will follow this path looking for ladybugs in each spot.",
      de:"Siehst du diese Punkte? <br>Maxi folgt diesem Pfad und sucht an jedem Punkt nach Karotten."
    },
    textDelay: "2",
    x:"50%",
    y:"82%",
    image_x: "-270px",
    image_y: "5%",
    textAlign: "center",
    imgfadeOut: "1"
  },
  {
    background: "flip_bg.png",
    foreground: "flip_yes.mp4",
    isVideo: "1",
    text: {
      en:"Under some of the spots, Pippa can find <br> a yummy ladybug that looks like this…",
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
      en:"Pippa knows that half of the spots have ladybugs in them  and half don’t have ladybugs, but Pippa does not know where those ladybugs are. ",
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
      en:"Pippa also knows that she needs to pay attention to how the ladybugs are distributed along the path to better predict what might happen in the next spot.",
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
    background: "chipmunk_clumpy.png",
    foreground: "standing_big.png",
    isVideo: "0",
    animation: {
      property: "y",
      to: "-200",
      duration: "3"
    },
    text: {
      en:"On some paths ladybugs can be grouped together. Pippa will then often find a few ladybugs in a row or a few empty spots in a row. On those paths you can help Pippa most by guessing the same thing that she found in the previous spot.",
      de:"Maxi weiß, dass es genauso gut möglich ist, <br> eine Karotte unter einem Punkt zu finden,  <br>wie es möglich ist, keine Karotte zu finden."
    },
    textDelay: "0",
    x:"40%",
    y:"65%",
    textAlign: "left",
    image_x: "19%",
    image_y: "1450px",
    image_width: "600px",
    imgfadeOut: "1"
  },
  {
    background: "chipmunk_dispersed.png",
    foreground: "standing_left.png",
    isVideo: "0",
    text: {
      en:"On some paths ladybugs are not grouped together. Pippa will then often find a single ladybug or a single empty spot in a row. On those paths you can help Pippa most by guessing the opposite thing that she found in the previous spot.",
      de:"Maxi weiß, dass es genauso gut möglich ist, <br> eine Karotte unter einem Punkt zu finden,  <br>wie es möglich ist, keine Karotte zu finden."
    },
    textDelay: "0",
    x:"20%",
    y:"65%",
    textAlign: "right",
    image_x: "60%",
    image_y: "1250px",
    image_width: "600px",
    imgfadeOut: "0"
  },
  {
    background: "path.png",
    foreground: "standing_left.png",
    animation: {
      property: "y",
      to: "-1317",
      duration: "3"
    },
    isVideo: "0",
    text: {
      en:"Let’s help Pippa guess <br>if there is something to eat <br> or nothing to eat under each spot.",
      de:"Hilf Maxi zu erraten, <br> ob es unter den einzelnen Punkten <br>etwas zu essen oder nichts zu essen gibt."
    },
    textDelay: "1",
    x:"37%",
    y:"82%",
    textAlign: "center",
    image_x: "52%",
    image_y: "1894px",
    image_width: "1300px",
    imgfadeOut: "1"
  }
]
