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

  // Importa fontkit
  import { PDFDocument, rgb } from 'pdf-lib';
  import fontkit from 'fontkit';
  
  // Registra fontkit con PDFDocument
  PDFDocument.registerFontkit(fontkit);


  // GENERATORE CERTIFICATO
  console.log("hello");

  const userName = document.getElementById("name");
  const submitBtn = document.getElementById("submitBtn");

  submitBtn.addEventListener("click", async () => {
      const val = userName.value;
  
      if (val.trim() !== "" && userName.checkValidity()) {
          try {
              const responsePdf = await fetch('https://raw.githubusercontent.com/aakraos/porconesimo/main/js/Certificate.pdf', {
                  method: 'GET',
                  mode: 'cors',
              });
  
              if (!responsePdf.ok) {
                  throw new Error('Errore nella richiesta del PDF: ' + responsePdf.statusText);
              }
  
              const existingPdfBytes = await responsePdf.arrayBuffer();
  
              const pdfDoc = await PDFDocument.load(existingPdfBytes);
  
              // Correggi il percorso del font
              const fontBytes = await fetch('https://raw.githubusercontent.com/aakraos/porconesimo/main/js/Sanchez-Regular.ttf', {
                  method: 'GET',
                  mode: 'cors',
              }).then((res) => res.arrayBuffer());
  
              const font = await pdfDoc.embedFont(fontBytes);
  
              const page = pdfDoc.getPages()[0];
  
              const maxWidth = page.getWidth() - 100;
              const textWidth = font.widthOfTextAtSize(val, 58);
              const fontSize = textWidth > maxWidth ? (58 * maxWidth) / textWidth : 58;
  
              const newTextWidth = font.widthOfTextAtSize(val, fontSize);
              const newCenterX = (page.getWidth() - newTextWidth) / 2;
  
              page.drawText(val, {
                  x: newCenterX,
                  y: 520,
                  size: fontSize,
                  font: font,
                  color: rgb(192 / 255, 192 / 255, 192 / 255),
              });
  
              // Aggiungi eventuali altre modifiche al PDF, se necessario
  
              const modifiedPdfBytes = await pdfDoc.save();
              const modifiedPdfBlob = new Blob([modifiedPdfBytes], { type: 'application/pdf' });
              const modifiedPdfUrl = URL.createObjectURL(modifiedPdfBlob);
  
              saveAs(modifiedPdfUrl, "newcertificate.pdf");
          } catch (error) {
              console.error(error);
          }
      } else {
          userName.reportValidity();
      }
  });
  
  function saveAs(uri, filename) {
      const link = document.createElement("a");
      link.href = uri;
      link.download = filename;
  
      // Aggiungi il link al documento e simula il clic
      document.body.appendChild(link);
      link.click();
  
      // Rimuovi il link dal documento
      document.body.removeChild(link);
  }