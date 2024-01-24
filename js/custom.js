// Get Current Year
function getCurrentYear() {
    var d = new Date();
    var year = d.getFullYear();
    document.querySelector("#displayDateYear").innerText = year;
}
getCurrentYear()

//client section owl carousel
$(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    navText: [
        '<i class="fa fa-long-arrow-left" aria-hidden="true"></i>',
        '<i class="fa fa-long-arrow-right" aria-hidden="true"></i>'
    ],
    autoplay: true,
    autoplayHoverPause: true,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        1000: {
            items: 2
        }
    }
});

/** google_map js **/

function myMap() {
    var mapProp = {
        center: new google.maps.LatLng(40.712775, -74.005973),
        zoom: 18,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
}

  function redirectToAbout() {
    window.location.href = "about.html";
  }

  function redirectToContact() {
    window.location.href = "contact.html";
  }

  function redirectToService() {
    window.location.href = "service.html";
  }

  // GENERATORE CERTIFICATO

console.log("hello")
const userName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const { PDFDocument, rgb, degrees } = PDFLib;


submitBtn.addEventListener("click", () => {
    const val =userName.value;
    if (val.trim() !== "" && userName.checkValidity()) {
        // console.log(val);
        generatePDF(val);
      } else {
        userName.reportValidity();
      }
});
const generatePDF = async (name) => {
    const existingPdfBytes = await fetch("https://raw.githubusercontent.com/aakraos/porconesimo/js/Certificate.pdf'").then((res) =>
      res.arrayBuffer()
    );

    // Load a PDFDocument from the existing PDF bytes
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    pdfDoc.registerFontkit(fontkit);

    
  //get font
  const fontBytes = await fetch("/js/Sanchez-Regular.ttf").then((res) =>
  res.arrayBuffer()
);
  // Embed our custom font in the document
  const SanChezFont  = await pdfDoc.embedFont(fontBytes);
   // Get the first page of the document
   const pages = pdfDoc.getPages();
   const firstPage = pages[0];
 
   // Get the width of the page
  // Set the maximum width for the text
  const maxWidth = firstPage.getWidth() - 100;

  // Calculate the width of the text at the original font size
  const textWidth = SanChezFont.widthOfTextAtSize(name, 58);

  // Adjust the font size dynamically if it exceeds the maximum width
  const fontSize = textWidth > maxWidth ? (58 * maxWidth) / textWidth : 58;

  // Calculate the new width of the text with the dynamic font size
  const newTextWidth = SanChezFont.widthOfTextAtSize(name, fontSize);

  // Calculate the new center based on the new text width
  const newCenterX = (firstPage.getWidth() - newTextWidth) / 2;

  // Draw the text centered and dynamically sized
  firstPage.drawText(name, {
    x: newCenterX,
    y: 520,  // You can adjust this coordinate as you prefer
    size: fontSize,
    font: SanChezFont,
    color: rgb(192 / 255, 192 / 255, 192 / 255),
  });

  // Serialize the PDFDocument to bytes (a Uint8Array)
  const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
  saveAs(pdfDataUri,"newcertificate.pdf")
};